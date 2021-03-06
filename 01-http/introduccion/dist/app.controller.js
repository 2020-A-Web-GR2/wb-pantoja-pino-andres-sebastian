"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    login(response) {
        return response.render('login/login');
    }
    loginPost(response, parametrosDeCuerpo, session) {
        const usuario = parametrosDeCuerpo.usuario;
        const password = parametrosDeCuerpo.password;
        if (usuario == 'andres' && password == '1234') {
            session.usuario = usuario;
            session.roles = ['Administrador'];
            return response.redirect('/protegido');
        }
        else {
            if (usuario == 'sebastian' && password == '5678') {
                session.usuario = usuario;
                session.roles = ['Supervisor'];
                return response.redirect('/protegido');
            }
            else {
                return response.redirect('/login');
            }
        }
    }
    protegido(response, session) {
        const estaLogeado = session.usuario;
        if (!estaLogeado) {
            return response.redirect('/login');
        }
        return response.render('login/protegido', {
            usuario: session.usuario,
            roles: session.roles,
        });
    }
    logout(session, request, response) {
        session.usuario = undefined;
        session.roles = undefined;
        request.session.destroy();
        return response.redirect('/login');
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('login'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "loginPost", null);
__decorate([
    common_1.Get('protegido'),
    __param(0, common_1.Res()),
    __param(1, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "protegido", null);
__decorate([
    common_1.Get('logout'),
    __param(0, common_1.Session()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "logout", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map