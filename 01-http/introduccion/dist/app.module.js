"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const http_juego_module_1 = require("./http/http-juego.module");
const calculadora_module_1 = require("./calculadora/calculadora.module");
const usuario_module_1 = require("./usuario/usuario.module");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./usuario/usuario.entity");
const mascota_module_1 = require("./mascota/mascota.module");
const vacuna_module_1 = require("./vacuna/vacuna.module");
const mascota_entity_1 = require("./mascota/mascota.entity");
const vacuna_entity_1 = require("./vacuna/vacuna.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                name: 'default',
                type: 'mysql',
                host: 'localhost',
                port: 32769,
                username: 'mysql-web-clases',
                password: 'laclaveesunfactorimportante12345',
                database: 'mysql-web-clases',
                entities: [
                    usuario_entity_1.UsuarioEntity,
                    mascota_entity_1.MascotaEntity,
                    vacuna_entity_1.VacunaEntity
                ],
                synchronize: true,
                dropSchema: true,
            }),
            http_juego_module_1.HttpJuegoModule,
            calculadora_module_1.CalculadoraModule,
            usuario_module_1.UsuarioModule,
            mascota_module_1.MascotaModule,
            vacuna_module_1.VacunaModule,
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            app_service_1.AppService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map