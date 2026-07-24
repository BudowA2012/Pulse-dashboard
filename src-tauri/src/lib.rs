mod cpu;
mod gpu;
mod ram;

use cpu::*;
use gpu::*;
use ram::*;

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
                get_gpu_usage,
                get_ram_usage
            ]
        )
        .run(
            tauri::generate_context!()
        )
        .expect(
            "error while running tauri application"
        );
}