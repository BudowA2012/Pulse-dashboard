use serde::Serialize;
use sysinfo::Disks;

#[derive(Serialize)]
pub struct DiskInfo {
    pub name: String,
    pub mount: String,
    pub total_space: u64,
    pub available_space: u64,
    pub file_system: String,
    pub disk_type: String,
}

#[tauri::command]
pub fn get_disks() -> Vec<DiskInfo> {
    let disks = Disks::new_with_refreshed_list();

    let mut result: Vec<DiskInfo> = Vec::new();

    for disk in disks.list() {
        result.push(
            DiskInfo {
                name: disk
                    .name()
                    .to_string_lossy()
                    .to_string(),

                mount: disk
                    .mount_point()
                    .to_string_lossy()
                    .to_string(),

                total_space: disk.total_space(),

                available_space: disk.available_space(),

                file_system: disk
                    .file_system()
                    .to_string_lossy()
                    .to_string(),

                disk_type: format!("{:?}", disk.kind()),
            }
        );
    }

    result
}