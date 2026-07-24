use sysinfo::System;
use serde::Serialize;


// ==========================
// CPU USAGE
// ==========================

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



// ==========================
// CPU INFO
// ==========================

#[derive(Serialize)]
pub struct CpuInfo {

    pub usage: f32,

    pub name: String,

    pub physical_cores: usize,

    pub logical_threads: usize,

    pub frequency: u64,

    pub average_frequency: u64,

}



#[tauri::command]
pub fn get_cpu_info() -> CpuInfo {


    let mut sys = System::new();


    sys.refresh_cpu();



    std::thread::sleep(
        std::time::Duration::from_millis(500)
    );


    sys.refresh_cpu();



    let cpus = sys.cpus();



    let usage = if cpus.is_empty() {

        0.0

    } else {

        cpus
            .iter()
            .map(|cpu| cpu.cpu_usage())
            .sum::<f32>()
            /
            cpus.len() as f32

    };



    let name = match cpus.first() {

        Some(cpu) => cpu.brand().to_string(),

        None => "Unknown CPU".to_string()

    };



    let average_frequency = if cpus.is_empty() {

        0

    } else {

        cpus
            .iter()
            .map(|cpu| cpu.frequency())
            .sum::<u64>()
            /
            cpus.len() as u64

    };



    let frequency = match cpus.first() {

        Some(cpu) => cpu.frequency(),

        None => 0

    };



    CpuInfo {

        usage,

        name,

        physical_cores:
            sys.physical_core_count()
            .unwrap_or(0),


        logical_threads:
            cpus.len(),


        frequency,

        average_frequency,

    }

}