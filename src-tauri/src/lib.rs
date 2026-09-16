mod cpu;
mod gpu;
mod ram;
mod disk;
mod system_info;

use cpu::*;
use gpu::*;
use ram::*;
use disk::*;
use system_info::*;

use tauri_plugin_notification;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()

        .plugin(
            tauri_plugin_notification::init()
        )

        .invoke_handler(
            tauri::generate_handler![
                get_cpu_usage,
                get_cpu_info,
                get_gpu_usage,
                get_gpu_info,
                get_ram_usage,
                get_ram_info,
                get_ram_clock,
                get_disks,
                get_system_info
            ]
        )

        .run(
            tauri::generate_context!()
        )

        .expect(
            "error while running tauri application"
        );
}