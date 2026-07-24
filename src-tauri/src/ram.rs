use sysinfo::System;

#[tauri::command]
pub fn get_ram_usage() -> f32 {

    let mut sys = System::new();

    sys.refresh_memory();

    let total =
        sys.total_memory() as f32;

    let used =
        sys.used_memory() as f32;

    if total == 0.0 {
        return 0.0;
    }

    used / total * 100.0

}