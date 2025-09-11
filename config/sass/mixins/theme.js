module.exports = `
@mixin theme($color, $property, $rest: '') {
  @each $mode in $--xd-theme-list {
    &--#{$mode} {
      @if $mode == 'light' {
        #{$property}: map.get($--xd-colors-light-map, $color) #{$rest};
      } @else {
        #{$property}: map.get($--xd-colors-dark-map, $color) #{$rest};
      }
    }
  }
}

@mixin theme-selector($color, $property, $selector, $rest: '') {
  @each $mode in $--xd-theme-list {
    &--#{$mode} {
      @if $mode == 'light' {
        #{$selector} {
          #{$property}: map.get($--xd-colors-light-map, $color) #{$rest};
        }
      } @else {
        #{$selector} {
          #{$property}: map.get($--xd-colors-dark-map, $color) #{$rest};
        }
      }
    }
  }
}
`;
