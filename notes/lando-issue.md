# LLM summary of previous issue I had

## What the issue was

You could load `https://drupal-helmbench.lndo.site` **even when Docker Desktop and `docker ps` said nothing was running**. That felt impossible — but it was real.

## Why it happened (root causes)

There were **two overlapping problems**:

1. **Docker/WSL got out of sync**  
   Containers were still running at the Linux level (`containerd` + `docker-proxy`) even though the Docker CLI thought nothing existed. So the site kept working even though Docker Desktop showed nothing.

2. **Lando “helpfully” starts Docker**  
   Running `lando` commands auto-started Docker Desktop, which made it feel like Docker was coming back by itself.

So it wasn’t the project using host Apache. It was **zombie containers running outside Docker’s view**.

## How we confirmed it

- `docker ps` showed nothing
- But `ss -tlnp` still showed listeners on **443 / 8000**
- And the site responses were from **Debian Apache**, which matches the Lando container image (not host Apache)

That proved the site was still being served from containers, even though Docker wasn’t tracking them.

## The fix (what worked)

We did a **hard reset** of the Docker environment:

1. Wiped Docker containers/images/volumes
2. Stopped host Apache
3. Fully stopped `docker` and `containerd`
4. Confirmed nothing was listening on ports 80/443
5. Restarted clean with:
   ```bash
   lando start
   ```

After that, Docker, Lando, and the browser all agreed.

## Helpful things we learned

- **`.lndo.site` can still work even if Docker Desktop looks empty** if containers are running but the Docker daemon lost track of them.
- `ss -tlnp` is the **source of truth** for “what’s actually serving a port.”
- `lando list` tells you what Lando thinks is running, but it can still be wrong if the Docker engine is inconsistent.
- The “ECONNREFUSED 127.0.0.1:8000” warning is **normal** — it just means a fallback port isn’t open. The `.lndo.site` URL is the correct one.

# Today's issue

Reboot PC and drupal site doesn't seem to be up- understandable. Lando start. Site errors, due to the components module not being installed.

What?

I 100% installed the components module before, guaranteed.

I install it and site seems to work. But no content, nothing. It's as if it's a totally fresh install of Drupal, except with my theme as it should be, but no content or anything else that's usually stored in the db.

All the content on there was test content, but it's still extremely suss that this has happened and I'd like to get to the bottom of it.

I'm asking you to help because this is all beyond me. Not sure if the previous issue is related.

## Top output

```
top - 20:24:14 up  8:17,  1 user,  load average: 0.12, 0.10, 0.09
Tasks: 106 total,   1 running, 102 sleeping,   0 stopped,   3 zombie
%Cpu(s):  0.2 us,  0.6 sy,  0.0 ni, 99.0 id,  0.0 wa,  0.0 hi,  0.1 si,  0.0 st
MiB Mem :  32059.2 total,  29329.1 free,   2041.3 used,    688.8 buff/cache
MiB Swap:   8192.0 total,   8192.0 free,      0.0 used.  29596.3 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 108671 aido      20   0  104.3g 442504  63616 S   5.0   1.3   2:42.14 node
      1 root      20   0  166332  10748   7804 S   0.7   0.0   2:40.76 systemd
    490 root      20   0 2403292 109252  47360 S   0.3   0.3   0:17.47 python3.10
   1009 root      20   0   44236  37740  10112 S   0.3   0.1   1:28.48 python3
   1684 aido      20   0   11.1g  66400  42752 S   0.3   0.2   0:05.08 node
 110660 1001      20   0 5286996 518920  39168 S   0.3   1.6   0:29.81 mysqld
 138117 aido      20   0    8232   4096   3328 R   0.3   0.0   0:00.02 top
      2 root      20   0    3060   1920   1792 S   0.0   0.0   0:00.01 init-systemd(Ub
     10 root      20   0    3096   1796   1792 S   0.0   0.0   0:00.05 init
     48 root      19  -1   47756  14336  13568 S   0.0   0.0   0:00.28 systemd-journal
     69 root      20   0   23128   6144   4608 S   0.0   0.0   0:00.36 systemd-udevd
     81 root      20   0  152992   1408   1280 S   0.0   0.0   0:00.00 snapfuse
     84 root      20   0  152992   1408   1280 S   0.0   0.0   0:00.00 snapfuse
     91 root      20   0  377284  11256   1408 S   0.0   0.0   0:00.48 snapfuse
     94 root      20   0  153124   1412   1280 S   0.0   0.0   0:00.00 snapfuse
    102 root      20   0  152992   1408   1280 S   0.0   0.0   0:00.00 snapfuse
    110 root      20   0  526812  12548   1408 S   0.0   0.0   0:02.05 snapfuse
    113 root      20   0  152992   1408   1280 S   0.0   0.0   0:00.00 snapfuse
    116 root      20   0  302520  10268   1280 S   0.0   0.0   0:00.91 snapfuse
    216 _rpc      20   0    8104   3968   3584 S   0.0   0.0   0:00.04 rpcbind
    217 systemd+  20   0   26356  13952   8960 S   0.0   0.0   0:00.17 systemd-resolve
    221 message+  20   0    8620   4352   3968 S   0.0   0.0   0:00.07 dbus-daemon
    224 root      20   0   30212  18684  10112 S   0.0   0.1   0:00.07 networkd-dispat
    226 syslog    20   0  222404   5504   4352 S   0.0   0.0   0:00.05 rsyslogd
    228 root      20   0 2514976  38804  24576 S   0.0   0.1   0:01.69 snapd
    229 root      20   0   15356   7168   6400 S   0.0   0.0   0:00.11 systemd-logind
    238 root      20   0    4332   2560   2432 S   0.0   0.0   0:00.04 cron
    278 root      20   0    4784   3200   3072 S   0.0   0.0   0:00.15 subiquity-serve
    280 root      20   0  107296  21376  13440 S   0.0   0.1   0:00.06 unattended-upgr
    281 root      20   0 2247284  51284  36224 S   0.0   0.2   0:03.77 containerd
    293 root      20   0    3240   2176   2048 S   0.0   0.0   0:00.00 agetty
    298 root      20   0    3196   2176   2048 S   0.0   0.0   0:00.00 agetty
```

Shell

```
❯ lando list
[]
❯ lando start
Let's get this party started! Starting app drupal-helmbench...
[+] Running 1/1
 ✔ Container landoproxyhyperion5000gandalfedition_proxy_1  Started                                                                                                                                           0.7s
[+] Running 2/2
 ✔ Container drupalhelmbench_database_1   Started                                                                                                                                                            0.5s
 ✔ Container drupalhelmbench_appserver_1  Started                                                                                                                                                            0.6s
[+] Healthchecking 1/1
 ✔ Healthcheck drupalhelmbench_database_1  Passed

   ___                      __        __        __     __        ________
  / _ )___  ___  __ _  ___ / /  ___ _/ /_____ _/ /__ _/ /_____ _/ / / / /
 / _  / _ \/ _ \/  ' \(_-</ _ \/ _ `/  '_/ _ `/ / _ `/  '_/ _ `/_/_/_/_/
/____/\___/\___/_/_/_/___/_//_/\_,_/_/\_\\_,_/_/\_,_/_/\_\\_,_(_|_|_|_)


Your app is starting up but we have already detected some things you should investigate.
These may or may not prevent your app from working.

  ℹ Updates available!
    Lando has detected 10 packages that can be updated.
    Updating fixes bugs, security issues and bring new features.
    Run lando update

  ℹ Using an untested version of DOCKER DESKTOP
    We have not tested version 4.44.0 yet so congrats on being a pioneer!
    Seriously though, this is usually not an issue but be mindful that you
    are in uncharted territory. If you encounter an issue we recomend
    you downgrade to something <=4.37.99.


Here are some vitals:

 NAME      drupal-helmbench
 LOCATION  /home/aido/projects/drupal-helmbench
 SERVICES  appserver, database
 URLS
  ⚠ APPSERVER URLS
    ✔ http://drupal-helmbench.lndo.site/ [200]
    ✔ https://drupal-helmbench.lndo.site/ [200]
    ✔ http://drupal-helmbench.lndo.site:8000/ [200]
    ✖ Request failed with status code 500
    ✖ Request failed with status code 500

❯ lando list
[ { service: 'database',
    name: 'drupalhelmbench_database_1',
    app: 'drupalhelmbench',
    kind: 'app',
    status: 'Up 6 minutes',
    src: [ '/home/aido/projects/drupal-helmbench/.lando.yml' ],
    running: true },
  { service: 'appserver',
    name: 'drupalhelmbench_appserver_1',
    app: 'drupalhelmbench',
    kind: 'app',
    status: 'Up 6 minutes',
    src: [ '/home/aido/projects/drupal-helmbench/.lando.yml' ],
    running: true },
  { service: 'proxy',
    name: 'landoproxyhyperion5000gandalfedition_proxy_1',
    app: '_global_',
    kind: 'service',
    status: 'Up 6 minutes',
    src: 'unknown',
    running: true } ]
❯ lando drush cr
 [success] Cache rebuild complete.

❯ lando drush en components -y
 [success] Module components has been installed.
❯ lando drush cr
 [success] Cache rebuild complete.

    ~/projects/drupal-helmbench  on   main                                                                                                                                   took 4s   at 20:05:46  
```

# Root Cause Analysis (Feb 2, 2026)

## What Actually Happened

The database loss was **directly caused by the zombie container issue** from before. Here's the complete timeline:

### Evidence

1. **Database watchdog table** shows:

   - First entry: January 19, 2026 at 8:39 PM (initial install)
   - Last entry: February 2, 2026 at 8:06 PM (today)
   - **ZERO entries between these dates**

2. **Files on disk** from the "missing" period:

   - `ha-kiosk-concept-1.jpg` uploaded January 24
   - `goth nathan fielder.jpg` uploaded January 26
   - `PXL_20250129_024815020.PORTRAIT.jpg` uploaded February 2

3. **Docker journal from January 19** shows:
   - Network/DNS errors
   - Container that "failed to exit within 10s of signal 15 - using the force"
   - Signs of Docker/WSL2 instability

### What Happened

Between January 19 and February 2, I was using **zombie containers** that were running outside Docker's control. Those containers:

- Were NOT properly connected to the Docker volume `drupalhelmbench_data_database`
- Likely used in-memory storage or a different volume state
- Served the site normally but weren't persisting to the correct location
- Were destroyed during the hard reset or system reboot

**Files survived** because they're stored on the host filesystem (`web/sites/default/files/`) which is mounted directly.

**Database was lost** because the zombie containers weren't writing to the persistent Docker volume.

## Prevention: Backup System Implemented

To prevent this from happening again, I've added a comprehensive backup and health-check system.

### New Lando Commands

Three new commands are available:

```bash
lando backup        # Create a timestamped database backup
lando restore       # Restore from a backup (interactive)
lando health-check  # Verify database connectivity and detect issues
```

### How to Use

#### Regular Backups

Before making major changes, always backup:

```bash
lando backup
```

This creates a compressed backup in the `backups/` directory with automatic rotation (keeps last 10 backups).

#### Restore a Backup

If something goes wrong:

```bash
lando restore
```

This will:

1. Show you all available backups
2. Let you select which one to restore
3. Ask for confirmation (destructive operation!)
4. Restore the database and rebuild the cache

#### Health Checks

Periodically verify your database is working correctly:

```bash
lando health-check
```

This checks:

- Database connection
- Last activity timestamp (warns if > 24 hours old while actively using the site)
- Content counts (nodes, users)
- Drupal bootstrap status

**Important:** If `health-check` shows database activity is old but you've been using the site, you may have a zombie container issue again. Run `lando restart` immediately.

### Best Practices Going Forward

1. **Always `lando stop` before rebooting your PC** - cleanly shuts down containers
2. **Run `lando backup` daily** or before major changes
3. **Run `lando health-check` weekly** to catch issues early
4. **After Docker/WSL issues, verify with `health-check`** before doing more work
5. **Consider downgrading Docker Desktop** to version <=4.37.99 (currently on untested 4.44.0)

### Where Backups Are Stored

Backups are stored inside the container at `/app/backups/`, which corresponds to the project's `backups/` directory. They persist even if containers are recreated.

### Backup Script Features

- **Timestamped backups**: `helmbench-YYYYMMDD-HHMMSS.sql.gz`
- **Automatic rotation**: Keeps last 10 backups, deletes older ones
- **Compression**: gzipped for space efficiency
- **Size reporting**: Shows backup size on creation
- **Color-coded output**: Easy to read status messages
