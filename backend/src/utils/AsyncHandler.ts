const asyncHandler =
  (requestHandler: (arg0: any, arg1: any, arg2: any) => any) =>
  async (
    req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { success: boolean; message: any }): void; new (): any };
      };
    },
    next: any
  ) => {
    try {
      await requestHandler(req, res, next);
    } catch (error: any) {
      res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  };

export default asyncHandler;
