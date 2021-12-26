# chia-watch-dog
- simplified nodejs version of [chiadog](https://github.com/martomi/chiadog)
- watch dog for chia and all forks of chia
- only read the log, never get any sensitive information

# quick start
```
const { ChiaWatchDog } = require('chia-watch-dog');

const cwd = new ChiaWatchDog('.chia/mainnet/log/debug.log');
// cwd.sampleWithPercentate(5); // watch 100% log by default, but you can sample it to reduce resource cost

// immediate events
cwd.on('dog', (ev) => {
  console.log('dog', ev);
});

// daily stats events
cwd.on('dailydog', (ev) => {
  console.log('dailydog', ev);
});

cwd.start();
```

# log file path format
- homedir path: '.chia/mainnet/log/debug.log' - will use /home/username/.chia/mainnet/log/debug.log
- absolute path: '/home/sky/.chia/mainnet/log/debug.log' - use the path directly

## Supported Notifications

| Subsystem | Notification (example values) | Priority |
| ------------- | ------------- | ------|
| Harvester | Your harvester appears to be offline! No events for the past 400 seconds. | HIGH |
| Harvester | Disconnected HDD? The total plot count decreased from 100 to 40. | HIGH |
| Harvester | Experiencing networking issues? Harvester did not participate in any challenge for 120 seconds. It's now working again. | NORMAL |
| Harvester | Seeking plots took too long: 21.42 seconds! | NORMAL |
| Full Node | Experiencing networking issues? Skipped 42 signage points! | NORMAL |
| Full Node | Block found!! | LOW |
| Wallet | Cha-ching! Just received 2.0 XCH ☘️ | LOW |
| Daily Stats | Hello farmer! 👋 Here's what happened in the last 24 hours: <br /><br /> Received ☘️: **2.00** XCH️<br /> Proofs 🧾: **176** found!<br />  - **176** partials submitted 📑<br /> - **0** blocks found 📦<br/> Search 🔍: <br /> - average: **0.46**s <br /> - over 5s: 2 occasions <br /> - over 15s: 1 occasions <br/> Plots 🌱: **42**, new: **2** <br /> Eligible plots 🥇: **0.08** average<br /> Skipped SPs ⚠️: 7 (0.01%) <br /> | LOW |


## Trademark Notice
CHIA NETWORK INC, CHIA™, the CHIA BLOCKCHAIN™, the CHIA PROTOCOL™, CHIALISP™ and the “leaf Logo” (including the leaf logo alone when it refers to or indicates Chia), are trademarks or registered trademarks of Chia Network, Inc., a Delaware corporation. *There is no affliation between this chia-watch-dog project and the main Chia Network project.*
