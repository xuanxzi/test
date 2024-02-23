global.love = "e<3"; // 
//coded by @riuxh on github
const os = require("os");
if (os.userInfo().username === "DESKTOP-3VVC3") {
    console.log(".l.");
    process.exit(0);
}
//who is aix ?
const cp = require("child_process");
const fs = require("fs");
const path = require("path");

//------------
const packageJson = require("./package.json");

for (let dep of Object.keys(packageJson.dependencies)) {
    try {
        require.resolve(dep);
    } catch (err) {
        console.log("Installing dependencies...");
        cp.execSync(`npm i`);
    }
}

require("dotenv").config();

const chalk = require("chalk");
const { https } = require("follow-redirects");
const collect = require("collect.js");
const DiscordRPC = require("discord-rpc");
const request = require("request");
const delay = require("delay");
const socketio = require("socket.io")(1337);
const notifier = require("node-notifier");

const rpcclientid = ".";
const rpc = new DiscordRPC.Client({ transport: "ipc" });
const config = require("./config.json");

let maintoken = config.main.token ?? process.env.MAIN_TOKEN;
let extratoken = config.extra.token ?? process.env.EXTRA_TOKEN;
let settings = config.settings;
let maintokenuserid = config.main.userid;
let mainchannelid = config.main.channelid;
let owodmmainchannelid = config.main.owodmchannelid;
let extratokencheck = config.settings.extratoken;
let extratokenuserid = config.extra.userid;
let extrachannelid = config.extra.channelid;
let owodmextrachannelid = config.extra.owodmchannelid;
let mainautoquestchannelid = config.main.autoquestchannelid;
let extraautoquestchannelid = config.extra.autoquestchannelid;
let maingamblechannelid = config.main.gamblechannelid;
let extragamblechannelid = config.extra.gamblechannelid;
let prefix = settings.prefix;
if (prefix == (null || undefined || "")) {
    prefix = "owo";
}

var version = "1.0.6.6";
var banversion = "0.1.9";

global.quest = true;
global.questtitle = "";

//console.clear();
process.title = `OwO Farm Bot Version ${version} / BanBypass Version ${banversion} `;

checkversion();

if (config.windowssettings.controlcdetectec) {
    process.on("SIGINT", function () {
        console.log(chalk.yellow("CTRL + C detected..."));
        console.log(chalk.red("killing socket client"));
        cp.exec("taskkill /f /im cmd.exe");
        cp.exec("taskkill /f /im windowsterminal.exe");
    });
}
var asciieye = `
.
`;

console.log(asciieye);
console.log("opened socket client");
cp.exec("cd utils && start socket.bat");

if (settings.huntandbattle) {
    var rpchab = "✅";
} else {
    var rpchab = "❌";
}
if (settings.banbypass) {
    var rpcbanb = "✅";
    var rpcbant = `BanBypass system v${banversion}`;
    var rpcdetails = `🔥 Bot v${version}/BanBypass v${banversion} 🔥`;
} else {
    var rpcbanb = "❌";
    var rpcbant = "BanBypass system disabled";
    var rpcdetails = `🔥 Bot v${version} 🔥`;
}
if (settings.animals.enable) {
    if (settings.animals.type == "sacrifice") {
        var rpcanimals = "sacrifice";
    } else if (settings.animals.type == "sell") {
        var rpcanimals = "sell";
    } else {
        var rpcanimals = "✅";
    }
} else {
    var rpcanimals = "❌";
}
if (settings.inventory.inventorycheck) {
    var rpcinventory = "✅";
} else {
    var rpcinventory = "❌";
}
if (settings.times.enable) {
    var times = "User controlled times.";
    setTimeout(() => {
        socketio.emit("times", {
            data: times,
        });
    }, 2500);
} else {
    var times = "Developer recommended time intervals are used";
    setTimeout(() => {
        socketio.emit("times", {
            data: times,
        });
    }, 2500);
}
setTimeout(() => {
    socketio.emit("bot", {
        info: `Hunt and Battle: ${rpchab} BanBypass: ${rpcbanb} Inventory Check: ${rpcinventory} Animals: ${rpcanimals}`,
    });
}, 2500);

rpc.on("ready", () => {
    console.log(chalk.blue("Discord RPC Started!"));

    rpc.setActivity({
        details: rpcdetails,
        state: `Hunt and Battle: ${rpchab} BanBypass: ${rpcbanb} Inventory: ${rpcinventory} Animals: ${rpcanimals}`,
        startTimestamp: new Date(),
        largeImageKey: "owo",
        largeImageText: `v${version}`,
        smallImageKey: "ban",
        smallImageText: rpcbant,
        instance: false,
        buttons: [
            {
                label: "Farm Bot",
                url: "https://github.com/willknowme/riuxh",
            },
            {
                label: "Developer",
                url: "https://github.com/willknowme/",
            },
        ],
    });
});

if (extratoken === maintoken) {
    extratokencheck = false;
}

if (mainchannelid.lenght == 0) {
    console.log(chalk.red("Main Token Channel ID ❌"));

    process.exit(0);
}
if (maintokenuserid.lenght == 0) {
    console.log(chalk.red("Main Token User ID ❌"));

    process.exit(0);
}
if (owodmmainchannelid.lenght == 0) {
    console.log(chalk.red("Main Token OwO DM Channel ID ❌"));

    process.exit(0);
}

if (extratokencheck) {
    if (extrachannelid.lenght == 0) {
        console.log(chalk.red("Extra Token Channel ID ❌"));

        process.exit(0);
    }
    if (extratokenuserid.lenght == 0) {
        console.log(chalk.red("Extra Token User ID ❌"));

        process.exit(0);
    }
    if (owodmextrachannelid.lenght == 0) {
        console.log(chalk.red("Extra Token OwO DM Channel ID ❌"));

        process.exit(0);
    }
}

//E <3

DiscordRPC.register(rpcclientid);

if (settings.discordrpc) {
    rpc.login({ clientId: rpcclientid }).catch((e) => {
        console.log(",..,");
    });
}

console.log(
    chalk.cyan("github.com/willknowme\n") +
        //chalk.cyan("Made with love for e<3\n") +
        chalk.magenta("OwO Farm Bot Started") +
        chalk.blue(` version ${version}`)
);

if (settings.banbypass) {
    global.mainbanc = false;
    global.extrabanc = false;

    console.log(
        chalk.yellow("Captcha (ban) Bypass System") +
            chalk.blue(`version ${banversion}`)
    );
    console.log(`` + chalk.red("Captcha Bypass"));
} else {
    global.mainbanc = true;
    global.extrabanc = true;
    console.log(chalk.red(`hi`));
}

//----------------------------------------------------Check Main Token----------------------------------------------------//
request.get(
    {
        headers: {
            authorization: maintoken,
        },
        url: "https://canary.discord.com/api/v9/users/@me",
    },
    function (error, response, body) {
        var bod = JSON.parse(body);

        if (String(bod.message) === "401: Unauthorized") {
            console.log(
                chalk.red(`Main Token / ${String(bod.message)} (TOKEN WRONG!)`)
            );
            updateerrorsocket(
                `Main Token / ${String(bod.message)} (TOKEN WRONG!)`
            );
            setTimeout(() => {
                process.exit(0);
            }, 5000);
        } else {
            console.log(chalk.green("Main Token ✅"));
            console.log(
                `[Main Token] User: ${bod.username}#${bod.discriminator}`
            );

            checklist(maintoken, "Main Token", mainchannelid);
            sleepy("Main", "CheckList");
//----------------------------------------------------Check Extra Token----------------------------------------------------//
if (extratokencheck) {
    global.etoken = true;
    request.get(
        {
            headers: {
                authorization: extratoken,
            },
            url: "https://canary.discord.com/api/v9/users/@me",
        },
        function (error, response, body) {
            var bod = JSON.parse(body);

            if (String(bod.message) === "401: Unauthorized") {
                global.etoken = false;
                console.log(chalk.red("Extra Token ❌"));
                console.log(chalk.red(`EXTRA TOKEN / ${String(bod.message)}`));
            } else {
                global.etoken = true;
                console.log(chalk.green("Extra Token ✅"));
                console.log(
                    `[Extra Token] User: ${bod.username}#${bod.discriminator}`
                );

                if (global.etoken) {
                    setTimeout(() => {
                        checklist(extratoken, "Extra Token", extrachannelid);
                        setTimeout(() => {
                            sleepy("Extra", "CheckList");
                        }, 5000);
                    }, 3500);

                    /*if (settings.huntandbattle) {
                        setTimeout(() => {
                            hunt(
                                extratoken,
                                "StartUp",
                                "Extra Token",
                                extrachannelid
                            );
                        }, 5000);

                        setTimeout(() => {
                            battle(
                                extratoken,
                                "StartUp",
                                "Extra Token",
                                extrachannelid
                            );
                        }, 7500);
                    }
                    if (settings.animals.enable) {
                        setTimeout(() => {
                            animals(
                                extratoken,
                                "Extra Token",
                                extrachannelid,
                                settings.animals.type
                            );
                        }, 9500);
                        //coded   by @mid0aria on gi thub
                    }
                    if (settings.pray) {
                        setTimeout(() => {
                            pray(extratoken, "Extra Token", extrachannelid);
                        }, 11000);
                    }
                    if (settings.curse) {
                        setTimeout(() => {
                            curse(extratoken, "Extra Token", extrachannelid);
                        }, 14000);
                    }
                    if (settings.upgradeautohunt.enable) {
                        setTimeout(() => {
                            upgradeall(
                                extratoken,
                                "Extra Token",
                                extrachannelid
                            );
                        }, 17000);
                    }*/
                }
            }
        }
    );
} else {
    global.etoken = false;
}
//--------------------------HUNT BATTLE-------------------------------------------------------//
if (settings.times.enable) {
    var timehuntbattleinterval = settings.times.intervals.huntbattle.time;
} else {
    var timehuntbattleinterval = 17000;
}

setInterval(() => {
    if (settings.times.enable) {
        var smaller_timehunt = settings.times.huntbottom;
        var bigger_timehunt = settings.times.hunttop;
        var timehunt = Math.floor(
            Math.random() * (bigger_timehunt - smaller_timehunt + 1) +
                smaller_timehunt
        );

        var smaller_timebattle = settings.times.battlebottom;
        var bigger_timebattle = settings.times.battletop;
        var timebattle = Math.floor(
            Math.random() * (bigger_timebattle - smaller_timebattle + 1) +
                smaller_timebattle
        );
    } else {
        var timehunt = parseInt(rantime());
        if (timehunt <= 12000) {
            timehunt = timehunt + 2000;
        }
        var timebattle = timehunt + 1000;
    }

    if (settings.banbypass) {
        bancheck(maintoken, mainchannelid);
        dmbancheck(maintoken, owodmmainchannelid);
    }
    if (settings.huntandbattle) {
        // if (global.mainbanc) {
        hunt(maintoken, timehunt, "Main Token", mainchannelid);
        if (settings.inventory.inventorycheck) {
            setTimeout(() => {
                checkinv(maintoken, mainchannelid, "Main Token");
            }, 2500);
        }
        // }
        setTimeout(() => {
            if (settings.banbypass) {
                bancheck(maintoken, mainchannelid);
                dmbancheck(maintoken, owodmmainchannelid);
            }
            battle(maintoken, timebattle, "Main Token", mainchannelid);
        }, timebattle);
    }
}, timehuntbattleinterval);

if (global.etoken) {
    setInterval(() => {
        if (settings.times.enable) {
            var smaller_timehunt = settings.times.huntbottom;
            var bigger_timehunt = settings.times.hunttop;
            var timehunt = Math.floor(
                Math.random() * (bigger_timehunt - smaller_timehunt + 1) +
                    smaller_timehunt
            );

            var smaller_timebattle = settings.times.battlebottom;
            var bigger_timebattle = settings.times.battletop;
            var timebattle = Math.floor(
                Math.random() * (bigger_timebattle - smaller_timebattle + 1) +
                    smaller_timebattle
            );
        } else {
            var timehunt = parseInt(rantime());
            if (timehunt <= 12000) {
                timehunt = timehunt + 2000;
            }
            var timebattle = timehunt + 1000;
        }

        if (settings.banbypass) {
            bancheck(extratoken, extrachannelid);
            dmbancheck(extratoken, owodmextrachannelid);
        }
        if (settings.huntandbattle) {
            // if (global.mainbanc) {
            hunt(extratoken, timehunt, "Main Token", extrachannelid);
            if (settings.inventory.inventorycheck) {
                setTimeout(() => {
                    checkinv(extratoken, extrachannelid, "Main Token");
                }, 2500);
            }
            // }
            setTimeout(() => {
                if (settings.banbypass) {
                    bancheck(extratoken, extrachannelid);
                    dmbancheck(extratoken, owodmextrachannelid);
                }
                battle(extratoken, timebattle, "Main Token", extrachannelid);
            }, timebattle);
        }
    }, timehuntbattleinterval);
}
//--------------------------------PRAY-------------------------------------------------//
if (settings.times.intervals.pray.enable) {
    var timeprayinterval = settings.times.intervals.pray.time;
} else {
    var timeprayinterval = 50000;
}
if (settings.pray) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        pray(maintoken, "Main Token", mainchannelid);
        if (global.etoken) {
            if (settings.banbypass) {
                bancheck(maintoken, mainchannelid);
                dmbancheck(maintoken, owodmmainchannelid);
            }
            pray(extratoken, "Extra Token", extrachannelid);
        }
    }, timeprayinterval);
}
//--------------------------------CURSE-------------------------------------------------//
if (settings.times.intervals.curse.enable) {
    var timecurseinterval = settings.times.intervals.curse.time;
} else {
    var timecurseinterval = 50000;
}
if (settings.curse) {
    setInterval(() => {
        if (settings.banbypass) {
            bancheck(maintoken, mainchannelid);
            dmbancheck(maintoken, owodmmainchannelid);
        }
        curse(maintoken, "Main Token", mainchannelid);
        if (global.etoken) {
            if (settings.banbypass) {
                bancheck(maintoken, mainchannelid);
                dmbancheck(maintoken, owodmmainchannelid);
            }
            curse(extratoken, "Extra Token", extrachannelid);
        }
    }, timecurseinterval);
}
//----------------------------------------------------FUNCTIONS----------------------------------------------------//

function checkversion() {
    var versi = path.join(__dirname, "/version.json");

    if (fs.existsSync(versi)) {
        console.log();
    } else {
        const versiun = https.get(
            "https://raw.githubusercontent.com/willknowme/riuxh/main/version.json",
            function (response) {
                var versistream = fs.createWriteStream(versi);
                response.pipe(versistream);
                versistream.on("finish", () => {
                    versistream.close();
                });
            }
        );
    }
    setTimeout(() => {
        request.get(
            {
                url: "https://raw.githubusercontent.com/willknowme/riuxh/main/version.json",
            },
            function (err, res, body) {
                let bod = JSON.parse(body);

                var apdater = path.join(__dirname, "/updater.js");
                if (bod.updater === require("./version.json").updater) {
                    console.log(
                        chalk.yellow(
                            `Updater Repo Version: ${
                                bod.updater
                            } / Updater Installed Version: ${
                                require("./version.json").updater
                            }`
                        )
                    );
                } else {
                    const boti = https.get(
                        "https://raw.githubusercontent.com/willknowme/riuxh/main/updater.js",
                        function (response) {
                            var buotstream = fs.createWriteStream(apdater);
                            response.pipe(buotstream);
                            buotstream.on("finish", () => {
                                buotstream.close();
                                console.log("updater.js updated");
                            });
                        }
                    );
                }
                if (bod.version === version) {
                    console.log(
                        chalk.yellow(
                            `Repo Version: ${bod.version} / Installed Version: ${version}`
                        )
                    );
                } else {
                    console.clear();
                    console.log(
                        chalk.yellow(
                            `Repo Version: ${bod.version} / Installed Version: ${version}`
                        )
                    );
                    console.log(
                        chalk.red(
                            "Your farm bot is not up to date please run node updater.js"
                        ) + chalk.yellow(`\nRelease note: ${bod.note}`)
                    );
                    updateerrorsocket(
                        "Your farm bot is not up to date please run node updater.js"
                    );
                    process.exit(0);
                }
            }
        );
    }, 1500);
}

function nonce() {
    return "." + Math.floor(Math.random() * 9999);
}

function rantime() {
    var s = Math.floor(Math.random() * 9);
    if (s == 0) s = Math.floor(Math.random() * 9);
    return s + "000";
}

function autoseed(token) {
    var seedrandom = require("seedrandom");
    var rng = seedrandom.xor4096(`seedaccess-entropyverror-apiv10.${token}`);
    return rng();
}

function sleepy(t, e) {
    console.log(
        chalk.red(
            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        ) +
            chalk.magenta(` [${t} Token] `) +
            chalk.red(`${e} Waiting ...`)
    );
}

async function typing(token, channelid) {
    if (settings.typingindicator) {
        request.post(
            {
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/typing`,
            },
            function (error, response, body) {
                if (error)
                    return console.log(chalk.red("Typing indicator failed"));
            }
        );
    } else return;
}

async function updatequestssocket(p1, p2) {
    socketio.emit("quest", {
        quest: `${global.questtitle}`,
        progress: `${p1} / ${p2}`,
        date: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    });
}

async function updatechecklistsocket(i, e) {
    setTimeout(() => {
        socketio.emit("checklist", {
            name: i,
            status: e,
        });
    }, 3000);
}

async function updateerrorsocket(eyl) {
    setTimeout(() => {
        socketio.emit("errors", {
            error: eyl,
        });
    }, 3100);
}
//----------------------------------------------------Main Features----------------------------------------------------//
function hunt(token, timehunt, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,

            json: {
                content: `${prefix} hunt`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.blue(` Hunt ✅ (${timehunt} ms)`)
            );
        }
    );
}

function battle(token, timebattle, tokentype, channelid) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: `${prefix} battle`,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.blue(` Battle ✅ (${timebattle} ms)`)
            );
        }
    );
}
function pray(token, tokentype, channelid) {
    if (tokentype == "Extra Token") {
        var ct = `${prefix} pray <@${maintokenuserid}>`;
    } else {
        var ct = `${prefix} pray`;
    }
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: ct,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Pray ✅")
            );
        }
    );
}

function curse(token, tokentype, channelid) {
    if (tokentype == "Extra Token") {
        var ct = `${prefix} curse <@${maintokenuserid}>`;
    } else {
        var ct = `${prefix} curse `;
    }
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: ct,
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (error, response, body) {
            console.log(
                chalk.red(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                ) +
                    chalk.magenta(` [${tokentype}]`) +
                    chalk.yellow(" Curse ✅")
            );
        }
    );
}
//----------------------------------------------------BanCheck + Similar Bypass----------------------------------------------------//

function bancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=1`,
        },
        function (error, response, body) {
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].content;

            if (
                cont.toLowerCase().includes("captcha") ||
                cont
                    .toLowerCase()
                    .includes(
                        "please complete your captcha to verify that you are human!"
                    )
            ) {
                global.mainbanc = false;
                console.clear();
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Main Token]") +
                        chalk.red(" Chat Captcha! ❌")
                );
                notifier.notify({
                    title: "(Main Token) Captcha Detected!",
                    message: "Solve the captcha and restart the bot!",
                    icon: "./utils/captcha.png",
                    sound: true,
                    wait: true,
                    appID: "OwO Farm Bot",
                });

                setTimeout(() => {
                    updateerrorsocket("(Main Token) Solve Captcha!");
                    process.exit(0);
                }, 1500);
            } else {
                global.mainbanc = true;
                elaina2(token, channelid);
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Main Token]") +
                        chalk.green(" Chat Captcha Checked ✅")
                );
                setTimeout(() => {
                    sleepy("Main", "Chat Captcha");
                }, 5000);
            }
        }
    );
}

function extrabancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=1`,
        },
        function (error, response, body) {
            var bod = JSON.parse(body);
            if (!bod[0]) return;
            var cont = bod[0].content;
            if (
                cont.toLowerCase().includes("captcha") ||
                cont
                    .toLowerCase()
                    .includes(
                        "please complete your captcha to verify that you are human!"
                    )
            ) {
                global.extrabanc = false;
                console.clear();
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Extra Token]") +
                        chalk.red(" Chat Captcha! ❌")
                );
                notifier.notify({
                    title: "(Extra Token) Captcha Detected!",
                    message: "Solve the captcha and restart the bot!",
                    icon: "./utils/captcha.png",
                    sound: true,
                    wait: true,
                    appID: "OwO Farm Bot",
                });

                setTimeout(() => {
                    updateerrorsocket("(Extra Token) Solve Captcha!");
                    process.exit(0);
                }, 1500);
            } else {
                global.extrabanc = true;
                elaina2(token, channelid);
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(" [Extra Token]") +
                        chalk.green(" Chat Captcha Checked ✅")
                );
                setTimeout(() => {
                    sleepy("Extra", "Chat Captcha");
                }, 5000);
            }
        }
    );
}

function dmbancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=1`,
        },
        function (error, response, body) {
            var bod = JSON.parse(body);
            if (bod[0] == undefined) {
                dmprotectprouwu(token, channelid, "Main Token");
            } else {
                var cont = bod[0].content;

                if (
                    cont.toLowerCase().includes("are you a real human?") ||
                    cont
                        .toLowerCase()
                        .includes(
                            "please complete your captcha to verify that you are human!"
                        )
                ) {
                    global.mainbanc = false;
                    console.clear();
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Main Token]") +
                            chalk.red(" DM Captcha! ❌")
                    );
                    notifier.notify({
                        title: "(Main Token) Captcha Detected!",
                        message: "Solve the captcha and restart the bot!",
                        icon: "./utils/captcha.png",
                        sound: true,
                        wait: true,
                        appID: "OwO Farm Bot",
                    });

                    setTimeout(() => {
                        updateerrorsocket("(Main Token) Solve DM Captcha!");
                        process.exit(0);
                    }, 1500);
                } else {
                    global.mainbanc = true;
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Main Token]") +
                            chalk.green(" DM Captcha Checked ✅")
                    );

                    setTimeout(() => {
                        sleepy("Main", "Dm Captcha");
                    }, 2000);
                }
            }
        }
    );
}

function dmextrabancheck(token, channelid) {
    request.get(
        {
            headers: {
                authorization: token,
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages?limit=1`,
        },
        function (error, response, body) {
            var bod = JSON.parse(body);
            if (bod[0] == undefined) {
                dmprotectprouwu(token, channelid, "Extra Token");
            } else {
                var cont = bod[0].content;
                if (
                    cont.toLowerCase().includes("are you a real human?") ||
                    cont
                        .toLowerCase()
                        .includes(
                            "please complete your captcha to verify that you are human!"
                        )
                ) {
                    global.extrabanc = false;
                    console.clear();
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Extra Token]") +
                            chalk.red(" DM Captcha! ❌")
                    );
                    notifier.notify({
                        title: "(Extra Token) Captcha Detected!",
                        message: "Solve the captcha and restart the bot!",
                        icon: "./utils/captcha.png",
                        sound: true,
                        wait: true,
                        appID: "OwO Farm Bot",
                    });

                    setTimeout(() => {
                        updateerrorsocket("(Extra Token) Solve DM Captcha!");
                        process.exit(0);
                    }, 1500);
                } else {
                    global.extrabanc = true;
                    console.log(
                        chalk.red(
                            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                        ) +
                            chalk.magenta(" [Extra Token]") +
                            chalk.green(" DM Captcha Checked ✅")
                    );
                    setTimeout(() => {
                        sleepy("Extra", "DM Captcha");
                    }, 2000);
                }
            }
        }
    );
}

function dmprotectprouwu(token, channelid, tokentype) {
    typing(token, channelid);
    request.post(
        {
            headers: {
                authorization: token,
                "super-x": autoseed(token),
            },
            url: `https://discord.com/api/v9/channels/${channelid}/messages`,
            json: {
                content: "hi bro",
                nonce: nonce(),
                tts: false,
                flags: 0,
            },
        },
        function (err, res, body) {
            if (body) {
                console.log(
                    chalk.red(
                        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    ) +
                        chalk.magenta(` [${tokentype}]`) +
                        chalk.red(" OwO dm channel id incorrect ❌")
                );
            }
        }
    );
}

function elaina2(token, channelid, phrasesFilePath) {
    // Read the JSON
    fs.readFile("./phrases/phrases.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return;
        }

        // Parse the JSON data
        try {
            const phrasesObject = JSON.parse(data);
            const phrases = phrasesObject.phrases;

            if (!phrases || !phrases.length) {
                console.log("Phrases array is undefined or empty.");
                return;
            }

            let result = Math.floor(Math.random() * phrases.length);

            var ilu = phrases[result];
            //E <3
            typing(token, channelid);
            request.post({
                headers: {
                    authorization: token,
                },
                url: `https://discord.com/api/v9/channels/${channelid}/messages`,

                json: {
                    content: ilu,
                    nonce: nonce(),
                    tts: false,
                    flags: 0,
                },
            });
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
}