import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.path === 'albums/:id';
  }

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig !== null) {
      this.storedRoutes.set(String(route.routeConfig.path), handle);
    }
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig !== null && Boolean(this.storedRoutes.get(String(route.routeConfig.path)));
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return route.routeConfig !== null && this.storedRoutes.get(String(route.routeConfig.path)) as DetachedRouteHandle;
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
