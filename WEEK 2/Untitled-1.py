# ============================================
# CIRCLE OOP CHALLENGE - COMPLETE SOLUTION
# ============================================

import math
from functools import total_ordering


# =========================================================
# CIRCLE CLASS WITH ALL DUNDER METHODS
# =========================================================

@total_ordering  # Auto-generates remaining comparison methods
class Circle:
    """A class representing a Circle with radius/diameter properties."""
    
    def __init__(self, radius=None, diameter=None):
        """Initialize Circle with either radius or diameter."""
        if radius is not None:
            self._radius = radius
        elif diameter is not None:
            self._radius = diameter / 2
        else:
            self._radius = 1
    
    @property
    def radius(self):
        """Get the radius of the circle."""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """Set the radius of the circle."""
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
    
    @property
    def diameter(self):
        """Get the diameter of the circle."""
        return self._radius * 2
    
    @diameter.setter
    def diameter(self, value):
        """Set the diameter of the circle."""
        if value < 0:
            raise ValueError("Diameter cannot be negative")
        self._radius = value / 2
    
    @property
    def area(self):
        """Calculate and return the area of the circle."""
        return math.pi * (self._radius ** 2)
    
    # DUNDER METHODS
    def __str__(self):
        """String representation for users."""
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area:.2f})"
    
    def __repr__(self):
        """Official string representation."""
        return f"Circle(radius={self.radius})"
    
    def __add__(self, other):
        """Add two circles - returns new Circle with combined radius."""
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented
    
    def __eq__(self, other):
        """Check if two circles are equal (same radius)."""
        if isinstance(other, Circle):
            return self.radius == other.radius
        return NotImplemented
    
    def __gt__(self, other):
        """Compare if this circle is greater than another."""
        if isinstance(other, Circle):
            return self.radius > other.radius
        return NotImplemented
    
    def __lt__(self, other):
        """Compare if this circle is less than another."""
        if isinstance(other, Circle):
            return self.radius < other.radius
        return NotImplemented
    
    def __len__(self):
        """Return circumference as 'length'."""
        return int(2 * math.pi * self.radius)
    
    def __mul__(self, scalar):
        """Scale circle by a number."""
        if isinstance(scalar, (int, float)):
            return Circle(radius=self.radius * scalar)
        return NotImplemented
    
    def __rmul__(self, scalar):
        """Allow scalar * circle."""
        return self.__mul__(scalar)


# =========================================================
# BONUS: TURTLE VISUALIZATION
# =========================================================

def draw_circles_with_turtle(circles, title="Sorted Circles"):
    """Draw circles using Turtle graphics."""
    try:
        import turtle
        
        screen = turtle.Screen()
        screen.title(title)
        screen.setup(width=800, height=600)
        screen.bgcolor("white")
        
        t = turtle.Turtle()
        t.speed(0)
        t.hideturtle()
        
        sorted_circles = sorted(circles)
        start_y = 200
        spacing = 80
        colors = ["red", "blue", "green", "orange", "purple", "pink", "cyan", "yellow"]
        
        for i, circle in enumerate(sorted_circles):
            t.penup()
            x_pos = 0
            y_pos = start_y - (i * spacing)
            display_radius = min(circle.radius, 50)
            
            t.goto(x_pos, y_pos - display_radius)
            t.pendown()
            
            t.pencolor(colors[i % len(colors)])
            t.fillcolor(colors[i % len(colors)])
            t.pensize(3)
            
            t.begin_fill()
            t.circle(display_radius)
            t.end_fill()
            
            t.penup()
            t.goto(x_pos + display_radius + 10, y_pos)
            t.pencolor("black")
            label = f"r={circle.radius:.1f}"
            t.write(label, font=("Arial", 10, "normal"))
        
        screen.exitonclick()
        
    except ImportError:
        print("Turtle not available. Install: pip install PythonTurtle")
        return False
    return True


# =========================================================
# DEMONSTRATION
# =========================================================

if __name__ == "__main__":
    print("=" * 70)
    print("CIRCLE OOP CHALLENGE - COMPLETE SOLUTION")
    print("=" * 70)
    
    # 1. Create circles using radius or diameter
    print("\n1. CREATING CIRCLES:")
    c1 = Circle(radius=5)
    c2 = Circle(diameter=20)  # radius = 10
    c3 = Circle(radius=3)
    c4 = Circle(diameter=6)   # radius = 3 (equal to c3)
    
    print(f"c1 (radius=5): {c1}")
    print(f"c2 (diameter=20): {c2}")
    print(f"c3 (radius=3): {c3}")
    print(f"c4 (diameter=6): {c4}")
    
    # 2. Compute area
    print("\n2. AREA CALCULATION:")
    print(f"c1 area: {c1.area:.2f}")
    print(f"c2 area: {c2.area:.2f}")
    
    # 3. Add circles
    print("\n3. ADDING CIRCLES (__add__):")
    c_combined = c1 + c2
    print(f"c1 + c2 = {c_combined}")
    print(f"  (New radius: {c1.radius} + {c2.radius} = {c_combined.radius})")
    
    # 4. Compare circles
    print("\n4. COMPARISONS (__gt__, __eq__, __lt__):")
    print(f"c1 > c2? {c1 > c2} ({c1.radius} > {c2.radius})")
    print(f"c3 == c4? {c3 == c4} (both radius=3)")
    print(f"c1 < c2? {c1 < c2} ({c1.radius} < {c2.radius})")
    
    # 5. Sort list of circles
    print("\n5. SORTING LIST OF CIRCLES (__lt__):")
    circles = [c2, c1, c3, Circle(radius=15), Circle(diameter=4)]
    print("Unsorted:", [f"r={c.radius}" for c in circles])
    circles_sorted = sorted(circles)
    print("Sorted:", [f"r={c.radius}" for c in circles_sorted])
    
    # 6. Additional features
    print("\n6. ADDITIONAL FEATURES:")
    print(f"Circumference (len): {len(c1)}")
    print(f"Scale: c1 * 2 = {(c1 * 2).radius}")
    print(f"Scale: 3 * c1 = {(3 * c1).radius}")
    
    # 7. Modify properties
    print("\n7. MODIFYING PROPERTIES:")
    c_test = Circle(radius=5)
    print(f"Original: radius={c_test.radius}, diameter={c_test.diameter}")
    c_test.diameter = 20
    print(f"After diameter=20: radius={c_test.radius}, diameter={c_test.diameter}")
    
    # 8. Bonus: Turtle visualization
    print("\n8. BONUS: TURTLE VISUALIZATION")
    print("Close turtle window to exit")
    draw_circles_with_turtle(circles_sorted[:5])
    
    print("\n" + "=" * 70)
    print("CHALLENGE COMPLETED!")
    print("=" * 70)