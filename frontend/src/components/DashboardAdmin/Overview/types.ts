export interface DashboardData {
  stats: {
    jumlahPengguna: number
    penggunaIncrement: number
    jumlahMentor: number
    jumlahAdmin: number
    totalTransaksi: number
  }
  paymentStatus: {
    status: string
    count: number
    color: string
  }[]
  incomeData: {
    month: string
    mentoring: number
    bootcamp: number
    praktik: number
  }[]
  mentoringSessions: {
    status: string
    mentor: {
      name: string
      avatar?: string
    }
    mentee: {
      name: string
      avatar?: string
    }
    dateTime: string
    topic: string
    document: {
      name: string
      size: string
    }
  }[]
  activities: {
    id: string
    type: "user_delete" | "session_reschedule"
    title: string
    description: string
    time: string
  }[]
}
