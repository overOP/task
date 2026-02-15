import { Request, Response } from "express";
export declare class UserController {
    private static userService;
    static signup(req: Request, res: Response): Promise<void>;
    static signin(req: Request, res: Response): Promise<void>;
    static profile(req: Request, res: Response): Promise<void>;
    static logout(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map