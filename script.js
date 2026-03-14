async function getUserId(username) {

    const res = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usernames: [username],
            excludeBannedUsers: false
        })
    });

    const data = await res.json();

    return data.data[0].id;
}


async function checkUser() {

    const username = document.getElementById("username").value;
    const result = document.getElementById("result");

    result.innerText = "Loading...";

    try {

        const userId = await getUserId(username);

        const res = await fetch(
            "https://presence.roblox.com/v1/presence/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userIds: [userId]
                })
            }
        );

        const data = await res.json();

        const status = data.userPresences[0].userPresenceType;

        if (status === 0) result.innerText = "⚫ Offline";
        if (status === 1) result.innerText = "🟢 Online";
        if (status === 2) result.innerText = "🎮 In Game";
        if (status === 3) result.innerText = "🟢 In Studio";

    } catch (err) {

        result.innerText = "Error";

    }

}
