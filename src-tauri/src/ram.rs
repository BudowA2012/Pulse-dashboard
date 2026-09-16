use std::process::Command;
use sysinfo::System;

#[derive(serde::Serialize)]
pub struct RamInfo {
    pub total: u64,
    pub used: u64,
    pub available: u64,
    pub usage: f32,
}

#[tauri::command]
pub fn get_ram_usage() -> f32 {
    let mut sys = System::new();

    sys.refresh_memory();

    let total = sys.total_memory() as f32;
    let used = sys.used_memory() as f32;

    if total == 0.0 {
        return 0.0;
    }

    used / total * 100.0
}

#[tauri::command]
pub fn get_ram_info() -> RamInfo {
    let mut sys = System::new();

    sys.refresh_memory();

    let total = sys.total_memory();
    let used = sys.used_memory();
    let available = sys.available_memory();

    let usage = if total == 0 {
        0.0
    } else {
        used as f32 / total as f32 * 100.0
    };

    RamInfo {
        total,
        used,
        available,
        usage,
    }
}

#[tauri::command]
pub fn get_ram_clock() -> u64 {
    let command = r#"
$ram = Get-CimInstance Win32_PhysicalMemory
$values = $ram | ForEach-Object {
    if ($_.ConfiguredClockSpeed -gt 0) {
        $_.ConfiguredClockSpeed
    } else {
        $_.Speed
    }
}
($values | Measure-Object -Average).Average
"#;

    let output = Command::new("powershell")
        .args([
            "-NoProfile",
            "-NonInteractive",
            "-Command",
            command,
        ])
        .output();

    let output = match output {
        Ok(output) => output,
        Err(_) => return 0,
    };

    if !output.status.success() {
        return 0;
    }

    let text = String::from_utf8_lossy(&output.stdout);

    text.trim()
        .parse::<f64>()
        .map(|value| value.round() as u64)
        .unwrap_or(0)
}