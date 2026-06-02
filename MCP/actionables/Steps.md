## Step-by-Step Local Setup

### Step 1 — Create Project and Install Dependencies

```bash
mkdir ~/mcp-stats
cd ~/mcp-stats
python3 -m venv venv
source venv/bin/activate
pip install "mcp[cli]" psutil
```

**Packages:**
- `mcp[cli]` — official Anthropic MCP Python SDK, handles the stdio protocol automatically
- `psutil` — cross-platform system stats (CPU, RAM, disk, network, processes)

---

### Step 2 — Create `server.py`

Create `~/mcp-stats/server.py` with this content:

```python
import psutil
import platform
import time
from datetime import timedelta
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("local-stats")


@mcp.tool()
def get_cpu_usage() -> dict:
    """Get current CPU usage across all cores."""
    per_core = psutil.cpu_percent(interval=1, percpu=True)
    overall = round(sum(per_core) / len(per_core), 1)
    freq = psutil.cpu_freq()
    return {
        "overall_percent": overall,
        "per_core_percent": per_core,
        "core_count": psutil.cpu_count(),
        "frequency_mhz": round(freq.current, 1) if freq else None,
    }


@mcp.tool()
def get_memory_usage() -> dict:
    """Get RAM and swap memory usage."""
    ram = psutil.virtual_memory()
    swap = psutil.swap_memory()
    return {
        "ram": {
            "total_gb": round(ram.total / 1e9, 2),
            "used_gb": round(ram.used / 1e9, 2),
            "free_gb": round(ram.available / 1e9, 2),
            "percent_used": ram.percent,
        },
        "swap": {
            "total_gb": round(swap.total / 1e9, 2),
            "used_gb": round(swap.used / 1e9, 2),
            "percent_used": swap.percent,
        },
    }


@mcp.tool()
def get_disk_usage() -> list:
    """Get disk usage for all mounted partitions."""
    results = []
    for part in psutil.disk_partitions():
        try:
            usage = psutil.disk_usage(part.mountpoint)
            results.append({
                "mountpoint": part.mountpoint,
                "device": part.device,
                "total_gb": round(usage.total / 1e9, 2),
                "used_gb": round(usage.used / 1e9, 2),
                "free_gb": round(usage.free / 1e9, 2),
                "percent_used": usage.percent,
            })
        except PermissionError:
            pass
    return results


@mcp.tool()
def get_network_stats() -> dict:
    """Get cumulative network I/O statistics since last boot."""
    net = psutil.net_io_counters()
    return {
        "bytes_sent_mb": round(net.bytes_sent / 1e6, 2),
        "bytes_recv_mb": round(net.bytes_recv / 1e6, 2),
        "packets_sent": net.packets_sent,
        "packets_recv": net.packets_recv,
    }


@mcp.tool()
def get_top_processes(limit: int = 10, sort_by: str = "cpu") -> list:
    """
    Get top processes sorted by resource usage.
    sort_by: 'cpu' or 'memory'
    limit: number of processes to return (default 10)
    """
    procs = []
    for p in psutil.process_iter(["pid", "name", "cpu_percent", "memory_percent", "status"]):
        try:
            procs.append(p.info)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass
    key = "cpu_percent" if sort_by == "cpu" else "memory_percent"
    return sorted(procs, key=lambda x: x.get(key) or 0, reverse=True)[:limit]


@mcp.tool()
def get_system_info() -> dict:
    """Get general system information: OS, uptime, hostname, load averages."""
    boot_time = psutil.boot_time()
    uptime_seconds = time.time() - boot_time
    uptime = str(timedelta(seconds=int(uptime_seconds)))
    load = psutil.getloadavg()
    return {
        "hostname": platform.node(),
        "os": f"{platform.system()} {platform.release()}",
        "architecture": platform.machine(),
        "python_version": platform.python_version(),
        "uptime": uptime,
        "load_avg_1_5_15": [round(x, 2) for x in load],
        "cpu_count": psutil.cpu_count(),
    }


if __name__ == "__main__":
    mcp.run()  # stdio transport by default — Claude Code manages the process
```

---

### Step 3 — Register with Claude Code

Run this once on your machine (replace the path with your actual absolute path):

```bash
claude mcp add --scope user local-stats -- python3 /home/YOUR_USERNAME/mcp-stats/server.py
```

**Why each flag:**
- `--scope user` — registers the server globally for your user, available in **every** Claude Code session. Without this it only works in the current directory.
- `--` — separates Claude Code flags from the subprocess command
- absolute path — relative paths break when Claude Code starts from a different working directory

**Verify it registered:**
```bash
claude mcp list
```
You should see `local-stats` with its command listed.

---

### Step 4 — Test It

Start a **new** Claude Code session (MCP servers are discovered at session start, not mid-session).

Then just ask naturally:
- "What's my CPU usage right now?"
- "How much RAM am I using?"
- "Which process is eating the most CPU?"
- "Check my disk space"
- "Give me a full system health report"

Claude will call the appropriate tools and respond with live data from your machine.

---

## File Structure

```
~/mcp-stats/
├── server.py         ← the MCP server
├── requirements.txt
└── venv/
```

`requirements.txt`:
```
mcp[cli]
psutil
```

---