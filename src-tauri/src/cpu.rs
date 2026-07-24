use sysinfo::System;

#[tauri::command]
pub fn get_cpu_usage() -> f32 {

    let mut sys = System::new();

    sys.refresh_cpu();

    std::thread::sleep(
        std::time::Duration::from_millis(500)
    );

    sys.refresh_cpu();

    let cpus = sys.cpus();

    if cpus.is_empty() {
        return 0.0;
    }

    cpus
        .iter()
        .map(|cpu| cpu.cpu_usage())
        .sum::<f32>()
        /
        cpus.len() as f32

}