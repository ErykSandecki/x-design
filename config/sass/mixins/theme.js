module.exports = `
@mixin theme($color, $property, $rest: '') {
  @each $mode in $--rx-theme-list {
    &--#{$mode} {
      @if $mode == 'light' {
        #{$property}: map.get($--rx-colors-light-map, $color) #{$rest};
      } @else {
        #{$property}: map.get($--rx-colors-dark-map, $color) #{$rest};
      }
    }
  }
}

@mixin theme-selector($color, $property, $selector, $rest: '') {
  @each $mode in $--rx-theme-list {
    &--#{$mode} {
      @if $mode == 'light' {
        #{$selector} {
          #{$property}: map.get($--rx-colors-light-map, $color) #{$rest};
        }
      } @else {
        #{$selector} {
          #{$property}: map.get($--rx-colors-dark-map, $color) #{$rest};
        }
      }
    }
  }
}
`;
