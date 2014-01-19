var Common = {
    BEZIER_DETAIL_MAX : 50,
    ELLIPSE_DETAIL_MAX : 50,
    SPLINE_DETAIL_MAX : 50,
    LINE_ROUND_CAP_DETAIL_MAX :20,
    LINE_ROUND_CAP_DETAIL_MIN :4,
    CORNER_DETAIL_MAX : 10,
    TINT_MAX : 1.0,
    TINT_MIN : 0.0,

    SIZE_VERTEX   : 2,
    SIZE_TRIANGLE : 6,
    SIZE_QUAD     : 8,
    SIZE_LINE     : 4,
    SIZE_POINT    : 2,
    SIZE_COLOR    : 4,
    SIZE_TEXCOORD : 2,
    SIZE_FACE     : 3,

    SSAA_FACTOR : 2,

    BUFFER_DEFAULT_RESERVE_AMOUNT : 50
};

module.exports = Common;