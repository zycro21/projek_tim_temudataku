import type { DashboardData } from "./types"

export const mockDashboardData: DashboardData = {
  stats: {
    jumlahPengguna: 408,
    penggunaIncrement: 3,
    jumlahMentor: 12,
    jumlahAdmin: 4,
    totalTransaksi: 120,
  },
  paymentStatus: [
    { status: "Berhasil", count: 120, color: "bg-green-500" },
    { status: "Proses", count: 15, color: "bg-blue-500" },
    { status: "Pending", count: 8, color: "bg-yellow-500" },
    { status: "Gagal", count: 5, color: "bg-red-500" },
  ],
  incomeData: [
    { month: "Min", mentoring: 80000, bootcamp: 40000, praktik: 190000 },
    { month: "Sen", mentoring: 150000, bootcamp: 60000, praktik: 200000 },
    { month: "Sel", mentoring: 120000, bootcamp: 50000, praktik: 220000 },
    { month: "Rab", mentoring: 230000, bootcamp: 70000, praktik: 240000 },
    { month: "Kam", mentoring: 200000, bootcamp: 180000, praktik: 260000 },
    { month: "Jum", mentoring: 110000, bootcamp: 190000, praktik: 280000 },
    { month: "Sab", mentoring: 90000, bootcamp: 180000, praktik: 320000 },
  ],
  mentoringSessions: [
    {
      status: "Terjadwal",
      mentor: {
        name: "Laura Ayu",
      },
      mentee: {
        name: "Gilang Dirga",
      },
      dateTime: "1-05-2025, 20:00",
      topic: "SQL Query Optimization",
      document: {
        name: "Lorem Ipsum Dolor.pdf",
        size: "2MB",
      },
    },
    {
      status: "Terjadwal",
      mentor: {
        name: "Laura Ayu",
      },
      mentee: {
        name: "Gilang Dirga",
      },
      dateTime: "1-05-2025, 20:00",
      topic: "SQL Query Optimization",
      document: {
        name: "Lorem Ipsum Dolor.pdf",
        size: "2MB",
      },
    },
  ],
  activities: [
    {
      id: "1",
      type: "user_delete",
      title: "Admin menghapus akun pengguna",
      description: "Rizky D. (admin) menghapus akun pengguna loremipsum@email.com",
      time: "2 jam yang lalu",
    },
    {
      id: "2",
      type: "session_reschedule",
      title: "Sesi mentoring dijadwalkan ulang",
      description: "Sesi antara Mentor Rani dan Mentee Satria dijadwalkan ulang ke tanggal 23 April.",
      time: "4 jam yang lalu",
    },
    {
      id: "3",
      type: "session_reschedule",
      title: "Sesi mentoring dijadwalkan ulang",
      description: "Sesi antara Mentor Rani dan Mentee Satria dijadwalkan ulang ke tanggal 23 April.",
      time: "4 jam yang lalu",
    },
    {
      id: "4",
      type: "session_reschedule",
      title: "Sesi mentoring dijadwalkan ulang",
      description: "Sesi antara Mentor Rani dan Mentee Satria dijadwalkan ulang ke tanggal 23 April.",
      time: "4 jam yang lalu",
    },
  ],
}
