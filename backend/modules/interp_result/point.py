from scipy.interpolate import interp1d
import numpy as np


def get_interp_result(coords, method):
    x, y = coords

    n = len(x)
    s = [i for i in range(n)]
    t = np.linspace(0, n-1, n*50)

    u = interp1d(s, x, kind=method)
    v = interp1d(s, y, kind=method)

    X, Y = u(t), v(t)

    interp_points = [{'x': X[i], 'y':Y[i]} for i in range(0, len(X))]

    return interp_points
