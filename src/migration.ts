


export function runMigrations(_app) {
  const server = _app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer: { route: { path: any; regexp: string; stack: { method: any }[] } }) => {
      if (layer.route) {
        console.log(layer.route);
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item: any) => item !== undefined);
    const allRoutes = availableRoutes.map((availableRouteSingle: any) => {
        const permissions = this.getPermissions(availableRouteSingle)
        // console.log(availableRouteSingle.route);
        // return availableRouteSingle;
    })
}
