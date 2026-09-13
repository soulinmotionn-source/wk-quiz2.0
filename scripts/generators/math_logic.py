"""
math_logic.py
Generates 480 clean, distinct questions:
- Mathematics (160 questions)
- IQ & Logic (160 questions)
- English & Grammar (160 questions)
"""

def generate_math_questions(build_q_fn):
    cat = "Mathematics"
    diffs = ["easy", "medium", "hard"]
    questions = []
    idx = 1

    # Subcat 1: Mental Math & Arithmetic (40 questions)
    # 40 distinct math problems
    arithmetic_items = [
        ("What is the product of 17 multiplied by 8?", "136", ["126", "144", "148"], "17 multiplied by 8 equals 136 (10*8=80 plus 7*8=56)."),
        ("What is 25 percent of 240?", "60", ["50", "48", "72"], "25 percent is one-fourth; 240 divided by 4 equals 60."),
        ("What is the positive square root of 289?", "17", ["13", "19", "23"], "17 multiplied by 17 equals 289."),
        ("What is the sum of the prime numbers between 10 and 20?", "60", ["58", "62", "64"], "The prime numbers between 10 and 20 are 11, 13, 17, and 19. Their sum is 11 + 13 + 17 + 19 = 60."),
        ("What is the result when 345 is divided by 15?", "23", ["21", "25", "27"], "345 divided by 15 equals 23 (15 * 20 = 300, 15 * 3 = 45)."),
        ("What is the cube of 7 (7 raised to the third power)?", "343", ["243", "327", "363"], "7 * 7 = 49, and 49 * 7 = 343."),
        ("What is the least common multiple (LCM) of 12 and 18?", "36", ["24", "54", "72"], "Multiples of 18 are 18, 36; multiples of 12 are 12, 24, 36. The smallest shared multiple is 36."),
        ("What is the greatest common factor (GCF) of 48 and 64?", "16", ["8", "12", "24"], "Factors of 48 and 64 include 16 (48 = 16 * 3, 64 = 16 * 4)."),
        ("What is 15 percent of 80?", "12", ["10", "14", "16"], "10% of 80 is 8, and 5% is 4. 8 + 4 = 12."),
        ("What is the value of 2 raised to the 8th power?", "256", ["128", "512", "1024"], "2^8 = 256."),
        ("What is the absolute value of negative 47?", "47", ["-47", "0", "94"], "The absolute value measures distance from zero on the number line, which is always non-negative: | -47 | = 47."),
        ("What is the reciprocal of the fraction 3/8?", "8/3", ["-3/8", "3/8", "-8/3"], "The reciprocal flips numerator and denominator, giving 8/3."),
        ("What is the sum of the interior angles of a pentagon?", "540 degrees", ["360 degrees", "720 degrees", "900 degrees"], "Formula (n - 2) * 180 = (5 - 2) * 180 = 3 * 180 = 540 degrees."),
        ("What is the decimal equivalent of the fraction 7/8?", "0.875", ["0.785", "0.850", "0.825"], "7 divided by 8 equals 0.875."),
        ("What is the value of 5 factorial (5!)?", "120", ["60", "100", "720"], "5! = 5 * 4 * 3 * 2 * 1 = 120."),
        ("What is the remainder when 149 is divided by 8?", "5", ["3", "4", "6"], "8 * 18 = 144. 149 - 144 = 5."),
        ("What is the product of 0.4 and 0.05?", "0.02", ["0.2", "0.002", "0.0002"], "4 * 5 = 20; placing three decimal places gives 0.020 = 0.02."),
        ("What is the sum of 5/12 and 1/4?", "2/3", ["7/12", "3/4", "1/2"], "1/4 converts to 3/12. 5/12 + 3/12 = 8/12, which simplifies to 2/3."),
        ("What is the median of the following set of numbers: 4, 9, 12, 15, 22, 28, 31?", "15", ["12", "17", "22"], "In an ordered set of 7 values, the 4th value is the median: 15."),
        ("What is the arithmetic mean of 14, 22, 36, and 48?", "30", ["28", "32", "34"], "Sum = 14 + 22 + 36 + 48 = 120. 120 / 4 = 30."),
        ("What is the square of 25?", "625", ["525", "650", "675"], "25 * 25 = 625."),
        ("What is 35 percent of 300?", "105", ["95", "100", "115"], "35 * 3 = 105."),
        ("What is the value of 11 squared minus 9 squared?", "40", ["36", "44", "48"], "121 - 81 = 40 (or (11-9)(11+9) = 2*20 = 40)."),
        ("What is the product of negative 12 and negative 7?", "84", ["-84", "74", "-74"], "A negative multiplied by a negative yields a positive product: (-12) * (-7) = 84."),
        ("What is the smallest positive integer that is divisible by both 6 and 9?", "18", ["12", "27", "36"], "The least common multiple of 6 and 9 is 18."),
        ("How many degrees are in three-quarters of a full circle?", "270 degrees", ["180 degrees", "240 degrees", "300 degrees"], "3/4 of 360 degrees equals 270 degrees."),
        ("What is the square root of 441?", "21", ["19", "23", "25"], "21 * 21 = 441."),
        ("What is the result of 96 divided by 6?", "16", ["14", "18", "19"], "96 / 6 = 16."),
        ("What is the value of 3 to the 4th power?", "81", ["64", "72", "243"], "3 * 3 * 3 * 3 = 81."),
        ("What is 12.5 percent of 400?", "50", ["40", "45", "60"], "12.5% is 1/8. 400 / 8 = 50."),
        ("What is the prime factorization of 72?", "2^3 * 3^2", ["2^2 * 3^3", "2^4 * 3", "2 * 3^4"], "72 = 8 * 9 = 2^3 * 3^2."),
        ("What is the value of 14 times 15?", "210", ["195", "205", "225"], "14 * 15 = 14 * 10 + 14 * 5 = 140 + 70 = 210."),
        ("What is 18 percent of 250?", "45", ["40", "50", "55"], "18 * 2.5 = 45."),
        ("What is the positive difference between 532 and 278?", "254", ["244", "264", "274"], "532 - 278 = 254."),
        ("What is the value of 4 cubed minus 3 cubed?", "37", ["27", "35", "41"], "64 - 27 = 37."),
        ("What is the result of 1000 divided by 125?", "8", ["6", "7", "9"], "125 * 8 = 1000."),
        ("What is the value of 6 factorial divided by 4 factorial (6! / 4!)?", "30", ["24", "36", "48"], "6 * 5 = 30."),
        ("What is the decimal equivalent of 3/16?", "0.1875", ["0.1625", "0.1750", "0.1925"], "3 divided by 16 equals 0.1875."),
        ("What is the product of 24 and 11?", "264", ["254", "274", "284"], "24 * 11 = 264."),
        ("What is the sum of all angles in an equilateral triangle?", "180 degrees", ["90 degrees", "270 degrees", "360 degrees"], "All planar triangles have an interior angle sum of exactly 180 degrees.")
    ]

    for item in arithmetic_items:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "Mental Math & Arithmetic", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    # Subcat 2: Algebra & Equations (40 questions)
    algebra_items = [
        ("If 4x - 7 = 25, what is the value of x?", "8", ["6", "7", "9"], "Adding 7 to both sides gives 4x = 32. Dividing by 4 gives x = 8."),
        ("What are the real roots of the quadratic equation x^2 - 9x + 20 = 0?", "4 and 5", ["2 and 10", "3 and 6", "-4 and -5"], "Factoring (x - 4)(x - 5) = 0 gives solutions x = 4 and x = 5."),
        ("If 2x + 3y = 12 and y = 2, what is the value of x?", "3", ["2", "4", "5"], "Substitute y=2: 2x + 6 = 12 => 2x = 6 => x = 3."),
        ("What is the slope of the line given by the equation y = -3x + 8?", "-3", ["3", "8", "-8"], "In slope-intercept form y = mx + b, m represents the slope: -3."),
        ("If f(x) = 2x^2 - 3x + 1, what is the value of f(3)?", "10", ["8", "12", "14"], "f(3) = 2(9) - 3(3) + 1 = 18 - 9 + 1 = 10."),
        ("What is the solution for x in the inequality 3x - 5 > 16?", "x > 7", ["x > 5", "x < 7", "x > 8"], "Adding 5 gives 3x > 21. Dividing by 3 gives x > 7."),
        ("What is the simplified form of (x^3 * x^5) / x^2?", "x^6", ["x^5", "x^7", "x^8"], "Adding exponents in numerator: x^(3+5) = x^8. Subtracting denominator exponent: x^(8-2) = x^6."),
        ("If x + y = 10 and x - y = 4, what is the value of x?", "7", ["6", "8", "9"], "Adding the two equations yields 2x = 14, so x = 7."),
        ("What is the y-intercept of the line 4x - 2y = 8?", "-4", ["4", "2", "-2"], "Set x = 0: -2y = 8 => y = -4."),
        ("What is the discriminant of the quadratic equation 2x^2 - 4x + 1 = 0?", "8", ["4", "12", "16"], "Discriminant b^2 - 4ac = (-4)^2 - 4(2)(1) = 16 - 8 = 8."),
        ("If 5^(x - 1) = 125, what is the value of x?", "4", ["3", "5", "6"], "125 is 5^3. Therefore, x - 1 = 3 => x = 4."),
        ("What is the value of x if log base 2 of x is equal to 5?", "32", ["16", "25", "64"], "x = 2^5 = 32."),
        ("Simplify the algebraic expression: 3(2x - 4) - 2(x + 5)", "4x - 22", ["4x - 2", "4x + 2", "5x - 22"], "6x - 12 - 2x - 10 = 4x - 22."),
        ("If a car travels at a speed of 2r + 10 miles per hour for 3 hours, what expression gives the total distance?", "6r + 30", ["5r + 30", "6r + 10", "2r + 30"], "Distance = rate * time = (2r + 10) * 3 = 6r + 30."),
        ("What is the solution to the system: y = 2x and x + y = 9?", "x = 3, y = 6", ["x = 2, y = 7", "x = 4, y = 5", "x = 3, y = 3"], "Substitute y: x + 2x = 9 => 3x = 9 => x = 3, y = 6."),
        ("What is the degree of the polynomial 4x^3 - 7x^5 + 2x - 9?", "5", ["3", "4", "7"], "The degree is the highest exponent on the variable, which is 5."),
        ("If 1/x + 1/2 = 3/4, what is the value of x?", "4", ["2", "3", "5"], "1/x = 3/4 - 2/4 = 1/4 => x = 4."),
        ("What is the vertex of the parabola defined by y = (x - 3)^2 + 5?", "(3, 5)", ["(-3, 5)", "(3, -5)", "(-3, -5)"], "In vertex form y = a(x - h)^2 + k, the vertex is (h, k) = (3, 5)."),
        ("What is the solution set for |2x - 1| = 7?", "x = 4 and x = -3", ["x = 3 and x = -4", "x = 4 and x = -4", "x = 3 and x = -3"], "2x - 1 = 7 => 2x = 8 => x = 4; 2x - 1 = -7 => 2x = -6 => x = -3."),
        ("If x^2 - y^2 = 36 and x - y = 4, what is the value of x + y?", "9", ["6", "8", "12"], "x^2 - y^2 = (x - y)(x + y). 36 = 4(x + y) => x + y = 9."),
        ("If 3^(2x) = 81, what is the value of x?", "2", ["1", "3", "4"], "81 is 3^4. 2x = 4 => x = 2."),
        ("What is the slope of a horizontal line in Cartesian coordinates?", "0", ["1", "Undefined", "-1"], "A horizontal line has zero vertical change (rise), giving a slope of 0."),
        ("What is the slope of a vertical line in Cartesian coordinates?", "Undefined", ["0", "1", "Infinity"], "A vertical line has zero horizontal run, resulting in division by zero (undefined slope)."),
        ("What is the expanded form of (2x - 3)^2?", "4x^2 - 12x + 9", ["4x^2 - 9", "4x^2 + 12x + 9", "4x^2 - 6x + 9"], "(2x - 3)(2x - 3) = 4x^2 - 6x - 6x + 9 = 4x^2 - 12x + 9."),
        ("If 2^(x+3) = 64, what is the value of x?", "3", ["2", "4", "5"], "64 is 2^6. x + 3 = 6 => x = 3."),
        ("Solve for x: 7 - 2x = 19", "-6", ["-5", "6", "-13"], "-2x = 12 => x = -6."),
        ("What is the product of (x + 4) and (x - 4)?", "x^2 - 16", ["x^2 - 8x - 16", "x^2 + 16", "x^2 - 8"], "Difference of squares formula: (a+b)(a-b) = a^2 - b^2."),
        ("If a line passes through (0, 2) and (4, 10), what is its slope?", "2", ["1", "3", "4"], "Slope m = (10 - 2) / (4 - 0) = 8 / 4 = 2."),
        ("If 4x + 8 = 2x + 20, what is the value of x?", "6", ["4", "5", "8"], "2x = 12 => x = 6."),
        ("What is the sum of the roots of the equation x^2 - 7x + 12 = 0?", "7", ["12", "-7", "-12"], "By Vieta's formulas, the sum of the roots is -b/a = -(-7)/1 = 7."),
        ("What is the product of the roots of the equation x^2 - 5x + 6 = 0?", "6", ["5", "-6", "-5"], "By Vieta's formulas, the product of the roots is c/a = 6/1 = 6."),
        ("If 2/3 x = 16, what is the value of x?", "24", ["20", "22", "28"], "x = 16 * (3/2) = 24."),
        ("What is the value of x in the equation sqrt(2x + 5) = 5?", "10", ["8", "12", "15"], "Square both sides: 2x + 5 = 25 => 2x = 20 => x = 10."),
        ("What is the inverse function of f(x) = 3x - 6?", "(x + 6) / 3", ["(x - 6) / 3", "3x + 6", "1 / (3x - 6)"], "y = 3x - 6 => x = 3y - 6 => 3y = x + 6 => y = (x + 6)/3."),
        ("If 5x - 3y = 15, what is the value of y when x = 0?", "-5", ["5", "-3", "3"], "-3y = 15 => y = -5."),
        ("What is the distance between the points (1, 2) and (4, 6) in the coordinate plane?", "5", ["4", "6", "7"], "Distance = sqrt((4-1)^2 + (6-2)^2) = sqrt(9 + 16) = sqrt(25) = 5."),
        ("If x/4 - 3 = 2, what is the value of x?", "20", ["16", "18", "24"], "x/4 = 5 => x = 20."),
        ("What is the midpoint of the segment connecting (2, 8) and (6, 4)?", "(4, 6)", ["(3, 5)", "(4, 5)", "(5, 6)"], "Midpoint = ((2+6)/2, (8+4)/2) = (4, 6)."),
        ("What is the value of x if 2^(3x - 1) = 32?", "2", ["1", "3", "4"], "32 is 2^5. 3x - 1 = 5 => 3x = 6 => x = 2."),
        ("Simplify: (2x^2 y^3)^3", "8x^6 y^9", ["6x^5 y^6", "8x^5 y^6", "6x^6 y^9"], "2^3 * (x^2)^3 * (y^3)^3 = 8x^6 y^9.")
    ]

    for item in algebra_items:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "Algebra & Equations", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    # Subcat 3: Geometry & Angles (40 questions)
    geometry_items = [
        ("What is the area of a right triangle with a base of 12 cm and a height of 7 cm?", "42 cm^2", ["84 cm^2", "38 cm^2", "48 cm^2"], "Area = 1/2 * base * height = 1/2 * 12 * 7 = 42 cm^2."),
        ("What is the length of the hypotenuse of a right triangle with legs of 5 cm and 12 cm?", "13 cm", ["11 cm", "15 cm", "17 cm"], "By Pythagorean theorem: 5^2 + 12^2 = 25 + 144 = 169. sqrt(169) = 13 cm."),
        ("What is the sum of the interior angles of any planar quadrilateral?", "360 degrees", ["180 degrees", "270 degrees", "540 degrees"], "Every quadrilateral divides into two triangles: 2 * 180 = 360 degrees."),
        ("What is the circumference of a circle with a diameter of 14 cm (using pi = 22/7)?", "44 cm", ["88 cm", "154 cm", "28 cm"], "Circumference = pi * d = (22/7) * 14 = 44 cm."),
        ("What is the area of a circle with a radius of 7 cm (using pi = 22/7)?", "154 cm^2", ["44 cm^2", "308 cm^2", "98 cm^2"], "Area = pi * r^2 = (22/7) * 49 = 154 cm^2."),
        ("What is the measure of each interior angle of a regular hexagon?", "120 degrees", ["108 degrees", "135 degrees", "140 degrees"], "Total angles = (6 - 2) * 180 = 720. 720 / 6 = 120 degrees."),
        ("What is the measure of each interior angle in a regular octagon?", "135 degrees", ["120 degrees", "140 degrees", "150 degrees"], "Total angles = (8 - 2) * 180 = 1080. 1080 / 8 = 135 degrees."),
        ("Two angles are complementary. If one measures 38 degrees, what is the measure of the other?", "52 degrees", ["42 degrees", "62 degrees", "142 degrees"], "Complementary angles sum to 90 degrees: 90 - 38 = 52 degrees."),
        ("Two angles are supplementary. If one measures 115 degrees, what is the measure of the other?", "65 degrees", ["55 degrees", "75 degrees", "85 degrees"], "Supplementary angles sum to 180 degrees: 180 - 115 = 65 degrees."),
        ("What is the volume of a rectangular prism with length 8 cm, width 5 cm, and height 6 cm?", "240 cm^3", ["190 cm^3", "210 cm^3", "260 cm^3"], "Volume = length * width * height = 8 * 5 * 6 = 240 cm^3."),
        ("What is the total surface area of a cube with edge length of 4 cm?", "96 cm^2", ["64 cm^2", "80 cm^2", "128 cm^2"], "A cube has 6 square faces: 6 * (4^2) = 6 * 16 = 96 cm^2."),
        ("What is the perimeter of a rectangle with a length of 14 meters and a width of 9 meters?", "46 meters", ["42 meters", "48 meters", "126 meters"], "Perimeter = 2 * (14 + 9) = 2 * 23 = 46 meters."),
        ("In an isosceles triangle, if the vertex angle is 40 degrees, what is the measure of each base angle?", "70 degrees", ["60 degrees", "80 degrees", "65 degrees"], "180 - 40 = 140 degrees. Dividing equally: 140 / 2 = 70 degrees."),
        ("What is the volume of a cube with edge length of 6 cm?", "216 cm^3", ["144 cm^3", "196 cm^3", "256 cm^3"], "Volume = s^3 = 6 * 6 * 6 = 216 cm^3."),
        ("What is the measure of each exterior angle of any regular n-gon determined by?", "360 divided by n", ["180 divided by n", "(n - 2) * 180", "360 minus n"], "The sum of exterior angles of any convex polygon is always 360 degrees; each measures 360/n."),
        ("What is the area of a parallelogram with a base of 15 cm and a perpendicular height of 8 cm?", "120 cm^2", ["60 cm^2", "110 cm^2", "130 cm^2"], "Area of parallelogram = base * height = 15 * 8 = 120 cm^2."),
        ("What is the formula for the volume of a sphere of radius r?", "4/3 * pi * r^3", ["4 * pi * r^2", "2/3 * pi * r^3", "pi * r^3"], "The volume of a sphere is given by (4/3) * pi * r^3."),
        ("What is the formula for the surface area of a sphere of radius r?", "4 * pi * r^2", ["2 * pi * r^2", "4/3 * pi * r^2", "pi * r^2"], "The surface area of a sphere is 4 * pi * r^2."),
        ("If the ratio of the side lengths of two similar squares is 3:5, what is the ratio of their areas?", "9:25", ["3:5", "6:10", "27:125"], "The ratio of areas of similar figures equals the square of their linear ratio: 3^2 : 5^2 = 9 : 25."),
        ("What is the sum of the exterior angles of any convex polygon?", "360 degrees", ["180 degrees", "540 degrees", "720 degrees"], "The sum of the exterior angles of any convex polygon is always 360 degrees regardless of the number of sides."),
        ("How many sides does a regular polygon have if each of its exterior angles measures 45 degrees?", "8", ["6", "10", "12"], "360 / 45 = 8 sides (an octagon)."),
        ("What is the area of a trapezoid with parallel bases of 10 cm and 16 cm, and height of 5 cm?", "65 cm^2", ["55 cm^2", "70 cm^2", "130 cm^2"], "Area = 1/2 * (b1 + b2) * h = 1/2 * (10 + 16) * 5 = 1/2 * 26 * 5 = 65 cm^2."),
        ("What is the length of the diagonal of a square with side length of 8 cm?", "8 * sqrt(2) cm", ["16 cm", "12 cm", "8 * sqrt(3) cm"], "By Pythagorean theorem: d^2 = 8^2 + 8^2 = 128 => d = 8 * sqrt(2) cm."),
        ("What is the area of an equilateral triangle with side length 6 cm?", "9 * sqrt(3) cm^2", ["18 cm^2", "12 * sqrt(3) cm^2", "9 cm^2"], "Area = (sqrt(3)/4) * s^2 = (sqrt(3)/4) * 36 = 9 * sqrt(3) cm^2."),
        ("What is the measure of each interior angle of a regular pentagon?", "108 degrees", ["100 degrees", "112 degrees", "120 degrees"], "(5 - 2) * 180 = 540 degrees. 540 / 5 = 108 degrees."),
        ("What is the volume of a cylinder with radius 3 cm and height 10 cm (in terms of pi)?", "90 pi cm^3", ["30 pi cm^3", "60 pi cm^3", "120 pi cm^3"], "Volume = pi * r^2 * h = pi * 3^2 * 10 = 90 pi cm^3."),
        ("What is the lateral surface area of a cylinder with radius 4 cm and height 7 cm (in terms of pi)?", "56 pi cm^2", ["28 pi cm^2", "48 pi cm^2", "64 pi cm^2"], "Lateral Area = 2 * pi * r * h = 2 * pi * 4 * 7 = 56 pi cm^2."),
        ("What is the volume of a right circular cone with radius 6 cm and height 9 cm (in terms of pi)?", "108 pi cm^3", ["54 pi cm^3", "72 pi cm^3", "162 pi cm^3"], "Volume = 1/3 * pi * r^2 * h = 1/3 * pi * 36 * 9 = 108 pi cm^3."),
        ("In a 30-60-90 right triangle, if the shorter leg opposite the 30-degree angle is 5 cm, what is the length of the hypotenuse?", "10 cm", ["5 * sqrt(3) cm", "12 cm", "15 cm"], "In a 30-60-90 triangle, the hypotenuse is exactly twice the length of the shorter leg: 5 * 2 = 10 cm."),
        ("In a 45-45-90 right triangle, if the legs each measure 7 cm, what is the length of the hypotenuse?", "7 * sqrt(2) cm", ["14 cm", "7 * sqrt(3) cm", "10 cm"], "In a 45-45-90 triangle, the hypotenuse is leg * sqrt(2) = 7 * sqrt(2) cm."),
        ("What is the slope of the line perpendicular to a line with slope 4/5?", "-5/4", ["4/5", "-4/5", "5/4"], "Perpendicular slopes are negative reciprocals: -1 / (4/5) = -5/4."),
        ("What geometric shape has exactly four equal sides and four right angles?", "Square", ["Rhombus", "Rectangle", "Trapezoid"], "A square is both an equilateral and equiangular quadrilateral."),
        ("What is the term for a line segment connecting two points on a circle that passes through the center?", "Diameter", ["Radius", "Chord", "Secant"], "A diameter is the longest chord in a circle, passing through the central origin."),
        ("What is the measure of the angle formed by the hands of a clock at exactly 3:00?", "90 degrees", ["60 degrees", "75 degrees", "100 degrees"], "At 3:00, the minute hand is at 12 and the hour hand is at 3, creating a 90-degree right angle."),
        ("How many faces does a standard regular dodecahedron have?", "12", ["10", "14", "20"], "A dodecahedron has 12 regular pentagonal faces."),
        ("How many vertices does a standard cube have?", "8", ["6", "10", "12"], "A cube has 6 square faces, 12 edges, and 8 vertices."),
        ("How many edges does a standard regular octahedron have?", "12", ["8", "10", "16"], "An octahedron has 8 triangular faces, 6 vertices, and 12 edges."),
        ("What is the relationship between the radius and diameter of any circle?", "The diameter is exactly twice the radius", ["The radius is twice the diameter", "The diameter is the square of the radius", "The radius is half of the circumference"], "By definition, diameter d = 2 * r."),
        ("What is the area of a square with a perimeter of 40 cm?", "100 cm^2", ["80 cm^2", "120 cm^2", "160 cm^2"], "Side length s = 40 / 4 = 10 cm. Area = 10 * 10 = 100 cm^2."),
        ("What is the measure of an angle inscribed in a semicircle?", "90 degrees", ["60 degrees", "45 degrees", "120 degrees"], "By Thales' theorem, any angle inscribed in a semicircle is always a right angle (90 degrees).")
    ]

    for item in geometry_items:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "Geometry & Angles", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    # Subcat 4: Percentages & Ratios (40 questions)
    ratio_items = [
        ("A jacket originally priced at 80 dollars is on sale at a 25 percent discount. What is the sale price?", "60 dollars", ["55 dollars", "64 dollars", "68 dollars"], "25% of 80 is 20 dollars. 80 - 20 = 60 dollars."),
        ("If a ratio of boys to girls in a class of 35 students is 3:2, how many boys are in the class?", "21", ["14", "18", "24"], "Total parts = 3 + 2 = 5. Each part = 35 / 5 = 7. Boys = 3 * 7 = 21."),
        ("What is 150 percent of 60?", "90", ["80", "85", "95"], "1.5 * 60 = 90."),
        ("A population of bacteria increases from 400 to 500. What is the percentage increase?", "25 percent", ["20 percent", "15 percent", "30 percent"], "Increase = 100. Percentage = (100 / 400) * 100% = 25%."),
        ("If 6 workers can complete a job in 10 days, how many days will it take 12 workers working at the same rate?", "5 days", ["4 days", "6 days", "8 days"], "Total worker-days = 6 * 10 = 60. 60 / 12 = 5 days."),
        ("What is the simple interest earned on a principal of 1,000 dollars at a 5 percent annual interest rate after 3 years?", "150 dollars", ["100 dollars", "125 dollars", "200 dollars"], "I = P * r * t = 1000 * 0.05 * 3 = 150 dollars."),
        ("A recipe requires 3 cups of flour for every 2 cups of sugar. How many cups of sugar are needed for 9 cups of flour?", "6 cups", ["4 cups", "5 cups", "8 cups"], "Ratio is 3:2. 9 is 3 * 3, so sugar = 2 * 3 = 6 cups."),
        ("If an item costs 50 dollars and sales tax is 8 percent, what is the total cost including tax?", "54 dollars", ["52 dollars", "56 dollars", "58 dollars"], "Tax = 50 * 0.08 = 4 dollars. Total = 50 + 4 = 54 dollars."),
        ("A television marked at 400 dollars is discounted by 20 percent and then another 10 percent off the discounted price. What is the final price?", "288 dollars", ["280 dollars", "292 dollars", "300 dollars"], "After 20%: 400 * 0.80 = 320 dollars. After 10%: 320 * 0.90 = 288 dollars."),
        ("What is the ratio 18 to 24 expressed in simplest fractional form?", "3/4", ["2/3", "4/5", "5/6"], "Dividing numerator and denominator by 6 yields 3/4."),
        ("If 4 out of 25 students ride the bus to school, what percentage of students ride the bus?", "16 percent", ["12 percent", "14 percent", "20 percent"], "(4 / 25) * 100% = 16%."),
        ("What is the probability of rolling an even number on a standard fair six-sided die?", "1/2 (50 percent)", ["1/3", "1/6", "2/3"], "The even numbers are 2, 4, 6 (3 outcomes out of 6). 3/6 = 1/2."),
        ("In a bag of 30 marbles, 12 are blue, 8 are red, and 10 are green. What is the probability of drawing a blue marble?", "2/5 (40 percent)", ["1/3", "1/4", "1/2"], "12 / 30 simplifies by dividing by 6 to 2/5 = 40%."),
        ("If the price of gasoline drops from 4.00 dollars to 3.20 dollars per gallon, what is the percentage decrease?", "20 percent", ["15 percent", "25 percent", "30 percent"], "Decrease = 0.80. (0.80 / 4.00) * 100% = 20%."),
        ("What number is 30 percent of 150?", "45", ["35", "40", "50"], "0.30 * 150 = 45."),
        ("If a car travels 180 miles on 6 gallons of fuel, what is its fuel efficiency in miles per gallon?", "30 mpg", ["25 mpg", "28 mpg", "32 mpg"], "180 miles divided by 6 gallons equals 30 mpg."),
        ("What is the ratio of 45 minutes to 2 hours expressed in simplest form?", "3:8", ["1:4", "3:4", "2:5"], "2 hours = 120 minutes. 45 / 120 simplifies by dividing by 15 to 3/8."),
        ("If 5 pens cost 7.50 dollars, what is the cost of 8 pens at the same unit rate?", "12.00 dollars", ["10.50 dollars", "11.00 dollars", "13.50 dollars"], "Unit cost = 7.50 / 5 = 1.50 dollars. 8 * 1.50 = 12.00 dollars."),
        ("A stock investment of 500 dollars increases by 10 percent in the first year and 20 percent in the second year. What is the value after two years?", "660 dollars", ["650 dollars", "640 dollars", "670 dollars"], "Year 1: 500 * 1.10 = 550. Year 2: 550 * 1.20 = 660 dollars."),
        ("What percentage of an hour is 15 minutes?", "25 percent", ["15 percent", "20 percent", "30 percent"], "15 / 60 = 1/4 = 25%."),
        ("If the ratio of cement, sand, and gravel in concrete is 1:2:3, how many kg of sand are in 60 kg of dry mix?", "20 kg", ["10 kg", "30 kg", "15 kg"], "Total parts = 1 + 2 + 3 = 6. Each part = 60 / 6 = 10 kg. Sand = 2 * 10 = 20 kg."),
        ("What is the probability of flipping two fair coins and getting two heads?", "1/4 (25 percent)", ["1/2", "1/3", "1/8"], "Four equally likely outcomes: HH, HT, TH, TT. P(HH) = 1/4 = 25%."),
        ("A store owner buys an item for 40 dollars and sells it for 60 dollars. What is the markup percentage based on cost?", "50 percent", ["33.3 percent", "40 percent", "60 percent"], "Markup = 20 dollars. (20 / 40) * 100% = 50%."),
        ("If 30 percent of a number is 21, what is the number?", "70", ["60", "63", "80"], "0.30 * x = 21 => x = 21 / 0.30 = 70."),
        ("What is the ratio of the area of a circle of radius 2 to that of a circle of radius 4?", "1:4", ["1:2", "1:8", "1:16"], "Ratio = pi*(2^2) : pi*(4^2) = 4 : 16 = 1 : 4."),
        ("If a runner completes a 10 km race in 50 minutes, what is their average pace in minutes per kilometer?", "5 minutes per km", ["4 minutes per km", "6 minutes per km", "4.5 minutes per km"], "50 minutes divided by 10 km = 5 minutes per km."),
        ("What is the probability of rolling a sum of 7 with two standard fair six-sided dice?", "1/6 (6/36)", ["1/12", "1/9", "5/36"], "Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes out of 36. 6/36 = 1/6."),
        ("A meal costs 40 dollars and a diner leaves a 15 percent tip. What is the total amount paid?", "46 dollars", ["44 dollars", "45 dollars", "48 dollars"], "Tip = 40 * 0.15 = 6 dollars. Total = 40 + 6 = 46 dollars."),
        ("If 15 out of 60 members vote in favor of a motion, what percentage voted against if all members voted?", "75 percent", ["25 percent", "60 percent", "70 percent"], "15 voted in favor (25%), leaving 45 voting against (75%)."),
        ("What is the scale factor of a map where 1 centimeter represents 5 kilometers?", "1 : 500,000", ["1 : 5,000", "1 : 50,000", "1 : 5,000,000"], "5 km = 5,000 m = 500,000 cm. Scale ratio is 1 : 500,000."),
        ("If 3 identical pumps can drain a pool in 8 hours, how long would it take 4 identical pumps to drain the same pool?", "6 hours", ["5 hours", "7 hours", "4 hours"], "Total pump-hours = 3 * 8 = 24. 24 / 4 = 6 hours."),
        ("What is 0.6 percent expressed as a decimal?", "0.006", ["0.06", "0.6", "0.0006"], "0.6 divided by 100 equals 0.006."),
        ("If the odds in favor of an event occurring are 3 to 5, what is the probability that the event occurs?", "3/8 (37.5 percent)", ["3/5", "5/8", "2/5"], "Probability = favorable / total = 3 / (3 + 5) = 3/8 = 37.5%."),
        ("A real estate agent earns a 3 percent commission on a house that sells for 300,000 dollars. How much is the commission?", "9,000 dollars", ["6,000 dollars", "7,500 dollars", "10,000 dollars"], "300,000 * 0.03 = 9,000 dollars."),
        ("What is the percentage increase when a price rises from 50 dollars to 65 dollars?", "30 percent", ["25 percent", "35 percent", "40 percent"], "(15 / 50) * 100% = 30%."),
        ("If a map scale indicates 2 inches = 50 miles, how many miles do 5 inches represent?", "125 miles", ["100 miles", "120 miles", "150 miles"], "1 inch = 25 miles. 5 * 25 = 125 miles."),
        ("What is 80 percent of 125?", "100", ["90", "95", "105"], "0.80 * 125 = 100."),
        ("If two numbers have a sum of 40 and a ratio of 1:3, what is the smaller number?", "10", ["8", "12", "15"], "4 parts = 40 => 1 part = 10."),
        ("A student scored 72 out of 90 on a test. What is the percentage score?", "80 percent", ["75 percent", "82 percent", "85 percent"], "72 / 90 = 8 / 10 = 80%."),
        ("What is the ratio of 1 yard to 1 foot?", "3:1", ["2:1", "4:1", "12:1"], "There are 3 feet in 1 yard, giving a ratio of 3:1.")
    ]

    for item in ratio_items:
        diff = diffs[(idx - 1) % 3]
        questions.append(build_q_fn(cat, "Percentages & Ratios", diff, item[0], item[1], item[2], item[3], idx))
        idx += 1

    return questions

print("Loaded generate_math_questions successfully.")
