use serde::Serialize;
use std::process::Command;
use sysinfo::System;

#[derive(Serialize)]
pub struct SystemInfo {
    pub host_name: String,
    pub os_name: String,
    pub os_version: String,
    pub kernel_version: String,
    pub architecture: String,
    pub uptime: u64,
}

fn get_session_uptime() -> Option<u64> {
    let command = r#"
$explorer = Get-Process explorer -ErrorAction SilentlyContinue |
    Sort-Object StartTime |
    Select-Object -First 1

if ($explorer) {
    [int64]((Get-Date) - $explorer.StartTime).TotalSeconds
}
"#;

    let output = Command::new("powershell")
        .args([
            "-NoProfile",
            "-NonInteractive",
            "-Command",
            command,
        ])
        .output()
        .ok()?;

    if !output.status.success() {
        return None;
    }

    let text =
        String::from_utf8_lossy(
            &output.stdout
        );

    text.trim()
        .parse::<u64>()
        .ok()
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
    let uptime =
        get_session_uptime()
            .unwrap_or_else(
                System::uptime
            );

    SystemInfo {
        host_name:
            System::host_name()
                .unwrap_or_else(
                    || "Unknown".to_string()
                ),

        os_name:
            System::name()
                .unwrap_or_else(
                    || "Unknown".to_string()
                ),

        os_version:
            System::long_os_version()
                .unwrap_or_else(
                    || "Unknown".to_string()
                ),

        kernel_version:
            System::kernel_version()
                .unwrap_or_else(
                    || "Unknown".to_string()
                ),

        architecture:
            std::env::consts::ARCH
                .to_string(),

        uptime,
    }
}