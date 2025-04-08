import userBehaviorModel from "../models/userBehaviorModel";

// Fungsi untuk validasi input secara manual
const validateInput = (body: any) => {
  const errors: string[] = [];

  if (!Number.isInteger(body.userId)) {
    errors.push("User ID must be an integer");
  }
  if (typeof body.pageVisited !== "string" || body.pageVisited.trim() === "") {
    errors.push("Page visited cannot be empty");
  }
  if (body.action && typeof body.action !== "string") {
    errors.push("Action must be a string");
  }
  if (body.ipAddress && !/^(\d{1,3}\.){3}\d{1,3}$/.test(body.ipAddress)) {
    errors.push("Invalid IP address");
  }
  if (body.userAgent && typeof body.userAgent !== "string") {
    errors.push("User agent must be a string");
  }

  return errors;
};

// Fungsi untuk mencatat aktivitas pengguna
export const trackUserBehavior = async (req: any, res: any) => {
  // Validasi input manual
  const errors = validateInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { userId, pageVisited, action, ipAddress, userAgent } = req.body;

  try {
    const behavior = await userBehaviorModel.createUserBehavior(
      userId,
      pageVisited,
      action,
      ipAddress,
      userAgent
    );
    res.status(200).json({
      message: "User behavior tracked successfully",
      data: behavior,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      res.status(500).json({
        message: "Error tracking user behavior",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};

// Fungsi untuk mendapatkan aktivitas pengguna berdasarkan user_id dengan paginasi
export const getUserBehavior = async (req: any, res: any) => {
  const { userId } = req.params;
  const { limit = 10, page = 1 } = req.query;

  const offset = (page - 1) * limit;

  try {
    const behaviors = await userBehaviorModel.getUserBehaviorByUserId(
      userId,
      Number(limit),
      offset
    );
    res.status(200).json({
      message: "User behavior records fetched successfully",
      data: behaviors,
      meta: {
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      res.status(500).json({
        message: "Error fetching user behavior",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};

// Fungsi untuk mendapatkan aktivitas pengguna berdasarkan ID
export const getUserBehaviorById = async (req: any, res: any) => {
  const { id } = req.params; // Ambil ID dari parameter URL

  try {
    const behavior = await userBehaviorModel.getUserBehaviorById(Number(id));
    if (!behavior) {
      return res.status(404).json({
        message: "User behavior not found",
      });
    }
    res.status(200).json({
      message: "User behavior fetched successfully",
      data: behavior,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      res.status(500).json({
        message: "Error fetching user behavior by ID",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};
