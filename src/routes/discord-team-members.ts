import { Context } from "hono";
import { env } from "hono/adapter";

interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
}

interface DiscordGuildMember {
  user: DiscordUser;
  nick: string | null;
  roles: string[];
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
}

const DESIGNATION_DICT: { [key: string]: string } = {
  CEO: "Chief Executive Officer",
  CTO: "Chief Technology Officer",
  CMO: "Chief Marketing Officer",
  CEdO: "Chief Education Officer",
  TO: "Technology Officer",
  "Ed.": "Education Manager",
  "Mod.": "Moderator",
};

const teammembers = async (c: Context) => {
  const DISCORD_API_ENDPOINT = "https://discord.com/api/v10";
  const DISCORD_BOT_TOKEN = env<{ DISCORD_BOT_TOKEN: string }>(
    c,
  ).DISCORD_BOT_TOKEN;
  const GUILD_ID = env<{ GUILD_ID: string }>(c).GUILD_ID;

  const TEAM_ROLE_IDS = [
    "1228750328418009190", // Chief Executive Officer
    "1259557891418095628", // Education Manager
    "1251739236647047229", // Moderator
    "1291419801561989212", // Officer
  ];

  function extractNameAndRole(nickname: string): {
    name: string;
    role: string;
  } {
    const parts = nickname.split("|").map((part) => part.trim());
    if (parts.length === 2) {
      const abbreviation = parts[1];
      return {
        name: parts[0],
        role: DESIGNATION_DICT[abbreviation] || abbreviation,
      };
    }
    return { name: nickname, role: "Member" };
  }
  async function fetchGuildMembers(): Promise<DiscordGuildMember[]> {
    const response = await fetch(
      `${DISCORD_API_ENDPOINT}/guilds/${GUILD_ID}/members?limit=1000`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      },
    );
    if (!response.ok) throw new Error("Failed to fetch guild members");
    return response.json();
  }

  async function fetchUserData(userId: string): Promise<DiscordUser> {
    const response = await fetch(`${DISCORD_API_ENDPOINT}/users/${userId}`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch user data");
    return response.json();
  }

  try {
    const members = await fetchGuildMembers();
    const teamMembers: TeamMember[] = [];

    for (const member of members) {
      if (member.roles.some((role) => TEAM_ROLE_IDS.includes(role))) {
        const userData = await fetchUserData(member.user.id);
        const { name, role } = extractNameAndRole(
          member.nick || userData.username,
        );

        teamMembers.push({
          id: userData.id,
          name: name,
          designation: role,
          image: userData.avatar
            ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        });
      }
    }

    return c.json(teamMembers);
  } catch (error) {
    console.error("Error fetching Discord data:", error);
    return c.json({ error: "Failed to fetch Discord data" }, 500);
  }
};

export default teammembers;
