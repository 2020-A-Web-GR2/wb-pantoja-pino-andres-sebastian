import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    login(response: any): any;
    loginPost(response: any, parametrosDeCuerpo: any, session: any): any;
    protegido(response: any, session: any): any;
    logout(session: any, request: any, response: any): any;
}
