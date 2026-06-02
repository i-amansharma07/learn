# MCP Server: Local System Stats
---

Goal : I'm building an MCP server written in Python which will expose services to get stats of my local machine like ram usage, cpu utilisation etc.

## MCP Core Concepts

### Tools
The primary primitive. A **tool** is a function your MCP server exposes that Claude can call. Each tool has:
- `name` — what Claude calls it by
- `description` — how Claude decides *when* to use it
- `inputSchema` — JSON Schema for parameters
- `handler` — your actual Python function that runs

### Transport (why stdio for local)
- `stdio` — Claude Code spawns your Python script as a subprocess and talks to it via stdin/stdout. No server to start, no ports, no HTTPS, no auth. ← **this setup**
- `SSE / HTTP` — Claude connects to a running server via a URL. Used for remote/VPS setups.

### MCP Lifecycle
```
Claude Code session starts
  → reads MCP config, finds your server entry
  → spawns: python3 /path/to/server.py
  → sends initialize request via stdin
  → server responds with tool list
  → Claude now "knows" your tools
  → you ask something → Claude calls a tool
  → server runs the function → returns result via stdout
  → Claude uses it in its response
```

---