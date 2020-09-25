import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
    @Res() response,
  ) {
    return response.render('login/login');
  }

  @Post('login')
  loginPost(
    @Res() response,
    @Body() parametrosDeCuerpo,
    @Session() session,
  ) {
    //consultar si existe el usuario
    const usuario = parametrosDeCuerpo.usuario;
    const password = parametrosDeCuerpo.password;

    if (usuario == 'andres' && password == '1234') {
      session.usuario = usuario;
      session.roles = ['Administrador'];
      return response.redirect('/protegido');
    } else {
      if (usuario == 'sebastian' && password == '5678') {
        session.usuario = usuario;
        session.roles = ['Supervisor'];
        return response.redirect('/protegido');
      } else {
        return response.redirect('/login');
      }
    }
  }

  @Get('protegido')
  protegido(
    @Res() response,
    @Session() session,
  ) {

    const estaLogeado = session.usuario;
    if (!estaLogeado) {
      return response.redirect('/login');
    }

    return response.render('login/protegido',
      {
        usuario: session.usuario,
        roles: session.roles,
      });
  }


  @Get('logout')
  logout(
    @Session() session,
    @Req() request,
    @Res() response
  ){
    session.usuario = undefined;
    session.roles = undefined;
    request.session.destroy();
    return response.redirect('/login')
  }

}
