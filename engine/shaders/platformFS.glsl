varying highp vec2 vTexCoord;

uniform sampler2D textureAtlas;
uniform highp vec3 offset;

uniform highp float uHeight;
uniform highp float uWidth;
uniform highp vec3 uScale;

const highp float unitsPerTile = 32.0/512.0 * 20.0;

highp vec2 getTile(highp vec2 tex_coord) {
    return vec2(uScale.x, uScale.y);
    highp float scaleX = unitsPerTile;
    highp float scaleY = unitsPerTile;

    highp float limitX = uWidth;
    highp float limitY = uHeight;

    if (tex_coord.x >= 0.0 && tex_coord.x <= scaleX && tex_coord.y >= 0.0 && tex_coord.y <= scaleY) { return vec2(0.0, 0.0); } // Left down corner
    if (tex_coord.x >= 0.0 && tex_coord.x <= scaleX && tex_coord.y <= limitY && tex_coord.y >= limitY - scaleY) { return vec2(0.0, 2.0 * uScale.y); } // Left top corner
    if (tex_coord.x <= limitX && tex_coord.x >= limitX - scaleX && tex_coord.y <= limitY && tex_coord.y >= limitY - scaleY) { return vec2(2.0 * uScale.x, 2.0 * uScale.y); } // Right top corner
    if (tex_coord.x <= limitX && tex_coord.x >= limitX - scaleX && tex_coord.y >= 0.0 && tex_coord.y <= scaleY) { return vec2(2.0 * uScale.x, 0.0); } // Right down corner

    if (!(tex_coord.x >= 0.0 && tex_coord.x <= scaleX) && !(tex_coord.x <= limitX && tex_coord.x >= limitX - scaleX) &&  tex_coord.y <= limitY && tex_coord.y >= limitY - scaleY) { return vec2(uScale.x, 2.0 * uScale.y); } // Top border
    if (!(tex_coord.x >= 0.0 && tex_coord.x <= scaleX) && !(tex_coord.x <= limitX && tex_coord.x >= limitX - scaleX) && tex_coord.y >= 0.0 && tex_coord.y <= scaleY) { return vec2(uScale.x, 0.0); } // Down border
    if (tex_coord.x >= 0.0 && tex_coord.x <= scaleX && !(tex_coord.y >= 0.0 && tex_coord.y <= scaleY) && !(tex_coord.y <= limitY && tex_coord.y >= limitY - scaleY)) { return vec2(0.0, uScale.y); } // Left border
    if (tex_coord.x <= limitX && tex_coord.x >= limitX - scaleX && !(tex_coord.y >= 0.0 && tex_coord.y <= scaleY) && !(tex_coord.y <= limitY && tex_coord.y >= limitY - scaleY)) { return vec2(2.0 * uScale.x, uScale.y); } // Right border
    
}

void main(void) {
    highp vec2 offset2 = getTile(vec2(vTexCoord.x, vTexCoord.y));
    highp vec2 tex_coord = vec2(fract(vTexCoord.x) * uScale.x/unitsPerTile, fract(vTexCoord.y/unitsPerTile) * uScale.y) + offset2;
	gl_FragColor =  texture2D(textureAtlas, tex_coord).rgba;
    //gl_FragColor = vec4(offset2, 0.0, 1.0);
 //  gl_FragColor = 15.0 * vec4(vec2(fract(vTexCoord.x/unitsPerTile) * uScale.x/unitsPerTile, fract(vTexCoord.y/unitsPerTile) * uScale.y/unitsPerTile), 0.0, 1.0);
    if (gl_FragColor.a < 0.5) discard;
}