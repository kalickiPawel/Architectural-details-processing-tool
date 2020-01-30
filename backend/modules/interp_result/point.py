from scipy.interpolate import griddata, interp1d
import numpy as np


def get_interp_result(coords, method, grid_size=40):

    x, y, z = coords

    N = len(x)
    s = [i for i in range(N)]
    t = np.linspace(0, N-1, N*6)

    u = interp1d(s, x, kind=method)
    v = interp1d(s, y, kind=method)
    w = interp1d(s, z, kind=method)

    x, y, z = u(t), v(t), w(t)

    n = len(x)

    x = np.asarray(x).reshape((n, 1))
    y = np.asarray(y).reshape((n, 1))
    z = np.asarray(z).reshape((n, 1))

    minx, maxx = min(x)[0], max(x)[0]
    miny, maxy = min(y)[0], max(y)[0]

    xx, yy = np.mgrid[minx:maxx:grid_size*1j,
                      miny:maxy:grid_size*1j]

    xy = np.hstack((x, y))
    ZZ_interp = griddata(xy, z, (xx, yy), method=method)

    xx = xx.reshape((grid_size*grid_size, ))
    yy = yy.reshape((grid_size*grid_size, ))
    ZZ_interp = ZZ_interp.reshape((grid_size*grid_size, ))

    interp_points = [
        {
            'x': x,
            'y': y,
            'z': z
        }
        for x, y, z in zip(xx, yy, ZZ_interp)
        if not np.isnan(z)]

    return interp_points
