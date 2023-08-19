
import * as Color from 'color';


// Define the ComplementaryColors class
class ComplementaryColors {
  // Declare the properties of the class with types
  private color: Color;
  private hslColor: Color;

  // Define the constructor
  constructor(colorInput: string | object) {
    this.color = Color(colorInput);
    this.hslColor = Color(this.color.hsl());
  }

  // Define the methods of the class with their return types
  public primary() {
    return [this.hslColor.rgb()];
  }

  public complementary() {
    return [
      this.hslColor.rgb(),
      this.hslColor.rotate(180).rgb(),
    ];
  }

  public triad(){
    return [
      this.hslColor.rgb(),
      this.hslColor.rotate(120).rgb(),
      this.hslColor.rotate(120).rgb(),
    ];
  }

  public analogous() {
    return [
      this.hslColor.rotate(-30).rgb(),
      this.hslColor.rgb(),
      this.hslColor.rotate(30).rgb(),
    ];
  }

  public splitComplementary() {
    return [
      this.hslColor.rgb(),
      this.hslColor.rotate(-30).rgb(),
      this.hslColor.rotate(30).rgb(),
    ];
  }

  public tetradic() {
    return [
      this.hslColor.rgb(),
      this.hslColor.rotate(90).rgb(),
      this.hslColor.rotate(180).rgb(),
      this.hslColor.rotate(240).rgb(),
    ];
  }

  public square() {
    return [
      this.hslColor.rgb(),
      this.hslColor.rotate(90).rgb(),
      this.hslColor.rotate(180).rgb(),
      this.hslColor.rotate(270).rgb(),
    ];
  }
}

// Export the ComplementaryColors class
export default ComplementaryColors;
