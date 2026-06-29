import fs from 'node:fs'
import path from 'node:path'

const outDir = path.resolve('src/data')
fs.mkdirSync(outDir, { recursive: true })

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const writeJson = (name, value) => {
  fs.writeFileSync(path.join(outDir, name), `${JSON.stringify(value, null, 2)}\n`)
}

const topicTitles = [
  'Introduction to Vectors',
  'Scalars vs Vectors',
  'Representation of Vectors',
  'Position Vector',
  'Magnitude of a Vector',
  'Direction of a Vector',
  'Unit Vector',
  'Zero Vector',
  'Equal Vectors',
  'Negative of a Vector',
  'Parallel and Collinear Vectors',
  'Coplanar Vectors',
  'Addition of Vectors',
  'Triangle Law of Vector Addition',
  'Parallelogram Law of Vector Addition',
  'Polygon Law of Vector Addition',
  'Subtraction of Vectors',
  'Multiplication of a Vector by a Scalar',
  'Section Formula in Vector Form',
  'Components of a Vector',
  '2D Vector Components',
  '3D Vector Components',
  'Unit Vectors i, j, k',
  'Vector in Cartesian Form',
  'Direction Cosines',
  'Direction Ratios',
  'Dot Product / Scalar Product',
  'Geometrical Meaning of Dot Product',
  'Projection of One Vector on Another',
  'Work Done Interpretation of Dot Product',
  'Angle Between Two Vectors Using Dot Product',
  'Conditions for Perpendicular Vectors',
  'Cross Product / Vector Product',
  'Geometrical Meaning of Cross Product',
  'Area of Parallelogram Using Cross Product',
  'Area of Triangle Using Cross Product',
  'Right-Hand Rule',
  'Torque Interpretation of Cross Product',
  'Conditions for Parallel Vectors',
  'Scalar Triple Product Intro',
  'Mixed Concept Problems',
  'Graphical and 3D Interpretation',
  'Common JEE Traps',
  'Final Revision Section',
]

const clusters = [
  'Language of vectors',
  'Vector types',
  'Vector operations',
  'Components and coordinates',
  'Dot product family',
  'Cross product family',
  'Exam synthesis',
]

const clusterFor = (index) => {
  if (index < 6) return clusters[0]
  if (index < 12) return clusters[1]
  if (index < 19) return clusters[2]
  if (index < 26) return clusters[3]
  if (index < 32) return clusters[4]
  if (index < 40) return clusters[5]
  return clusters[6]
}

const formulas = [
  {
    id: 'magnitude-3d',
    title: 'Magnitude of a vector',
    latex: String.raw`\lvert \vec A \rvert=\sqrt{a_1^2+a_2^2+a_3^2}`,
    meaning: 'Length of the directed segment representing vector A.',
    geometry: 'It is the distance from the origin to the terminal point (a1, a2, a3).',
    algebra: 'It is the Euclidean norm found by adding squared components and taking the square root.',
    physics: 'It gives size only, such as speed from velocity or force strength from force components.',
    interpretation: 'In 3D, the formula is Pythagoras used twice.',
    trap: 'Do not add components directly. Magnitude of 2i + 3j is not 5; it is sqrt(13).',
    easyExample: 'For A = 3i + 4j, |A| = 5.',
    cbseExample: 'For A = 2i - j + 2k, |A| = sqrt(4 + 1 + 4) = 3.',
    jeeExample: 'If |xi + 2j + 2k| = 3, then x^2 + 8 = 9, so x = +/-1.',
    advancedTwist: 'Magnitude is unchanged by rotation of axes because squared length is invariant.',
  },
  {
    id: 'unit-vector',
    title: 'Unit vector',
    latex: String.raw`\hat A=\frac{\vec A}{\lvert \vec A \rvert}`,
    meaning: 'A vector in the same direction as A with magnitude 1.',
    geometry: 'It keeps the arrow direction and rescales the length to one unit.',
    algebra: 'Divide every component by the magnitude of the vector.',
    physics: 'Unit vectors separate direction from size, useful for force and velocity directions.',
    interpretation: 'A unit vector is a pure direction marker.',
    trap: 'Never divide by a zero vector because its direction is undefined.',
    easyExample: 'For A = 3i + 4j, unit vector = (3/5)i + (4/5)j.',
    cbseExample: 'Write the magnitude first, then divide each component.',
    jeeExample: 'Vector of magnitude 10 along 3i + 4j is 10[(3/5)i + (4/5)j].',
    advancedTwist: 'Every non-zero vector is magnitude times its unit vector.',
  },
  {
    id: 'addition',
    title: 'Vector addition',
    latex: String.raw`\vec A+\vec B=(a_1+b_1)\hat i+(a_2+b_2)\hat j+(a_3+b_3)\hat k`,
    meaning: 'The resultant obtained when B is applied after A.',
    geometry: 'Triangle, parallelogram, and polygon laws all give the same resultant.',
    algebra: 'Corresponding components are added.',
    physics: 'Net displacement, net force, and resultant velocity are vector sums.',
    interpretation: 'Addition combines effects in each independent direction.',
    trap: 'Do not add magnitudes unless the vectors are in the same direction.',
    easyExample: '(i + 2j) + (3i - j) = 4i + j.',
    cbseExample: 'Show component addition clearly with i, j, k terms grouped.',
    jeeExample: 'If A + B = 0, then B = -A and the vectors have equal magnitude opposite direction.',
    advancedTwist: 'Vector addition is commutative but the visual path can look different.',
  },
  {
    id: 'subtraction',
    title: 'Vector subtraction',
    latex: String.raw`\vec A-\vec B=(a_1-b_1)\hat i+(a_2-b_2)\hat j+(a_3-b_3)\hat k`,
    meaning: 'Subtracting B means adding the opposite vector -B.',
    geometry: 'If A and B start from the same tail, A - B points from tip of B to tip of A.',
    algebra: 'Subtract corresponding components.',
    physics: 'Relative position or relative velocity is a difference of vectors.',
    interpretation: 'Subtraction compares two directed quantities.',
    trap: 'A - B and B - A are opposite vectors.',
    easyExample: '(4i + j) - (i - 2j) = 3i + 3j.',
    cbseExample: 'Write A - B = A + (-B) for a board-style explanation.',
    jeeExample: 'Relative velocity of A with respect to B is vA - vB.',
    advancedTwist: 'Difference vectors naturally encode displacement between two points.',
  },
  {
    id: 'scalar-multiplication',
    title: 'Scalar multiplication',
    latex: String.raw`\lambda \vec A=\lambda a_1\hat i+\lambda a_2\hat j+\lambda a_3\hat k`,
    meaning: 'A scalar stretches, shrinks, or reverses a vector.',
    geometry: 'Positive lambda keeps direction; negative lambda reverses direction.',
    algebra: 'Multiply every component by the scalar.',
    physics: 'Changing the magnitude of a force without changing its line of action is scalar multiplication.',
    interpretation: 'Only the scale changes unless the scalar is negative.',
    trap: 'If lambda = 0, the result is the zero vector with no direction.',
    easyExample: '2(3i - j) = 6i - 2j.',
    cbseExample: 'Mention direction reversal when lambda is negative.',
    jeeExample: 'Vectors A and lambda A are parallel for every non-zero lambda.',
    advancedTwist: 'All scalar multiples of a non-zero vector lie on one line through the origin.',
  },
  {
    id: 'section-formula',
    title: 'Section formula in vector form',
    latex: String.raw`\vec r=\frac{m\vec B+n\vec A}{m+n}`,
    meaning: 'Position vector of a point dividing AB internally in ratio m:n.',
    geometry: 'The point is a weighted average of endpoint position vectors.',
    algebra: 'The point closer to B gets larger weight of A in the denominator expression.',
    physics: 'Same weighted-average idea appears in centre of mass.',
    interpretation: 'Internal division blends two positions.',
    trap: 'For AP:PB = m:n, the formula is (mB + nA)/(m+n), not (mA + nB)/(m+n).',
    easyExample: 'Midpoint is (A + B)/2.',
    cbseExample: 'Write ratio, endpoints, formula, substitution, final vector.',
    jeeExample: 'Use section formula to prove collinearity or find unknown coordinates.',
    advancedTwist: 'External division uses a signed denominator m - n.',
  },
  {
    id: 'dot-geometry',
    title: 'Dot product geometry',
    latex: String.raw`\vec A\cdot\vec B=\lvert \vec A\rvert\lvert \vec B\rvert\cos\theta`,
    meaning: 'The scalar product measures how much one vector acts along another.',
    geometry: 'It is magnitude of one vector times the projection of the other on it.',
    algebra: 'It gives one number, not a vector.',
    physics: 'Work done W = F dot s.',
    interpretation: 'Dot product is positive, zero, or negative according to along-ness.',
    trap: 'A dot B = 0 means perpendicular only when both vectors are non-zero.',
    easyExample: 'If angle is 60 degrees and magnitudes are 2 and 3, dot product is 3.',
    cbseExample: 'State theta as the angle between tails of the vectors.',
    jeeExample: 'Use dot product to find angle, projection, or perpendicularity.',
    advancedTwist: 'Dot product encodes a metric: it defines length and angle in coordinate space.',
  },
  {
    id: 'dot-component',
    title: 'Dot product component form',
    latex: String.raw`\vec A\cdot\vec B=a_1b_1+a_2b_2+a_3b_3`,
    meaning: 'Component-by-component multiplication followed by addition.',
    geometry: 'It is the algebraic version of |A||B|cos theta.',
    algebra: 'Same-axis components interact; perpendicular basis vectors contribute zero.',
    physics: 'Calculates work from component forces and displacements.',
    interpretation: 'Large same-direction components increase the dot product.',
    trap: 'Do not multiply unlike components such as a1b2.',
    easyExample: '(2i + j) dot (3i - j) = 6 - 1 = 5.',
    cbseExample: 'Use i dot i = 1, i dot j = 0 to justify component form.',
    jeeExample: 'If A dot B = 0, solve a component equation for unknowns.',
    advancedTwist: 'Orthogonal basis is the hidden reason the formula is so simple.',
  },
  {
    id: 'angle',
    title: 'Angle between two vectors',
    latex: String.raw`\cos\theta=\frac{\vec A\cdot\vec B}{\lvert \vec A\rvert\lvert \vec B\rvert}`,
    meaning: 'The angle is recovered by comparing dot product to magnitudes.',
    geometry: 'Cosine identifies how aligned the two arrows are.',
    algebra: 'Compute dot product and magnitudes, then divide.',
    physics: 'Helps decide whether a force helps motion, opposes it, or does no work.',
    interpretation: 'Cos theta lies between -1 and 1.',
    trap: 'Use the angle between vectors, not angle from an axis unless one vector is that axis.',
    easyExample: 'If dot product is 0, theta = 90 degrees.',
    cbseExample: 'Mention non-zero vector condition before applying formula.',
    jeeExample: 'For A dot B = |A||B|/2, theta = 60 degrees.',
    advancedTwist: 'Extreme dot product values occur at parallel or anti-parallel orientation.',
  },
  {
    id: 'perpendicular',
    title: 'Perpendicular condition',
    latex: String.raw`\vec A\cdot\vec B=0`,
    meaning: 'Two non-zero vectors are perpendicular when their dot product is zero.',
    geometry: 'A has no shadow along B.',
    algebra: 'The component sum a1b1 + a2b2 + a3b3 becomes zero.',
    physics: 'A force perpendicular to displacement does no work.',
    interpretation: 'Zero dot product means zero along-effect.',
    trap: 'The zero vector has dot product zero with every vector but is not given a direction.',
    easyExample: 'i and j are perpendicular because i dot j = 0.',
    cbseExample: 'Write "for non-zero vectors" in the conclusion.',
    jeeExample: 'Find k if (i + kj) dot (2i - 3j) = 0.',
    advancedTwist: 'Orthogonality is more general than visual right angles in higher dimensions.',
  },
  {
    id: 'scalar-projection',
    title: 'Scalar projection',
    latex: String.raw`\operatorname{comp}_{\vec B}\vec A=\frac{\vec A\cdot\vec B}{\lvert \vec B\rvert}`,
    meaning: 'Signed length of the shadow of A on the direction of B.',
    geometry: 'The shadow can be positive or negative depending on direction.',
    algebra: 'Dot product divided by the magnitude of the vector receiving the projection.',
    physics: 'Component of a force along displacement.',
    interpretation: 'Projection is a shadow measurement.',
    trap: 'Scalar projection is a number; vector projection is a vector.',
    easyExample: 'Projection of A on i is the x-component of A.',
    cbseExample: 'Define scalar projection before using formula.',
    jeeExample: 'If A dot B is negative, scalar projection is negative.',
    advancedTwist: 'Projection is the best one-dimensional approximation of A along B.',
  },
  {
    id: 'vector-projection',
    title: 'Vector projection',
    latex: String.raw`\operatorname{proj}_{\vec B}\vec A=\frac{\vec A\cdot\vec B}{\lvert \vec B\rvert^2}\vec B`,
    meaning: 'The shadow vector of A on B.',
    geometry: 'It lies along B or opposite B.',
    algebra: 'Scalar coefficient times vector B.',
    physics: 'Used to resolve forces along an inclined direction.',
    interpretation: 'It keeps both shadow length and direction.',
    trap: 'Denominator is |B|^2 because B itself is not usually a unit vector.',
    easyExample: 'Projection on i is (x)i.',
    cbseExample: 'Use vector projection only after confirming B is non-zero.',
    jeeExample: 'Projection can be subtracted from A to get a perpendicular component.',
    advancedTwist: 'A equals its parallel component plus perpendicular residual.',
  },
  {
    id: 'cross-magnitude',
    title: 'Cross product magnitude',
    latex: String.raw`\lvert\vec A\times\vec B\rvert=\lvert\vec A\rvert\lvert\vec B\rvert\sin\theta`,
    meaning: 'Magnitude of cross product equals area of the parallelogram on A and B.',
    geometry: 'It measures perpendicular spread, not along-ness.',
    algebra: 'The result is a vector perpendicular to both A and B.',
    physics: 'Torque magnitude is rF sin theta.',
    interpretation: 'Sine appears because height of the parallelogram is |B|sin theta.',
    trap: 'Cross product is zero for parallel vectors even if magnitudes are large.',
    easyExample: '|i x j| = 1.',
    cbseExample: 'Area of triangle is half this magnitude.',
    jeeExample: 'Use cross product to compute shortest area questions quickly.',
    advancedTwist: 'Cross product direction depends on orientation, so A x B = -(B x A).',
  },
  {
    id: 'cross-determinant',
    title: 'Cross product determinant',
    latex: String.raw`\vec A\times\vec B=\begin{vmatrix}\hat i&\hat j&\hat k\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix}`,
    meaning: 'Component formula for the vector perpendicular to A and B.',
    geometry: 'The determinant packages area and orientation.',
    algebra: 'Expand along i, j, k with the minus sign in the j component.',
    physics: 'Finds direction and magnitude of torque or angular momentum.',
    interpretation: 'A x B has components built from 2D area differences.',
    trap: 'The j component has a negative sign during expansion.',
    easyExample: 'i x j = k.',
    cbseExample: 'Show determinant expansion neatly.',
    jeeExample: 'Use determinant form to find area of parallelogram from coordinates.',
    advancedTwist: 'The determinant is oriented volume logic reduced to a perpendicular vector.',
  },
  {
    id: 'parallel',
    title: 'Parallel condition',
    latex: String.raw`\vec A\times\vec B=\vec 0`,
    meaning: 'Non-zero vectors are parallel when the cross product is zero.',
    geometry: 'The parallelogram collapses to a line, so area is zero.',
    algebra: 'Component ratios are equal when all relevant denominators are non-zero.',
    physics: 'Torque is zero when force is along the position vector.',
    interpretation: 'No perpendicular spread means no cross product magnitude.',
    trap: 'Zero cross product may also involve a zero vector; check non-zero condition.',
    easyExample: '2i + 4j is parallel to i + 2j.',
    cbseExample: 'Write A = lambda B or A x B = 0.',
    jeeExample: 'Use component ratios to test collinearity quickly.',
    advancedTwist: 'Parallelism is a one-dimensional dependence relation.',
  },
  {
    id: 'area-parallelogram',
    title: 'Area of parallelogram',
    latex: String.raw`\text{Area}=\lvert\vec A\times\vec B\rvert`,
    meaning: 'Area of the parallelogram formed by adjacent sides A and B.',
    geometry: 'Base |A| times perpendicular height |B|sin theta.',
    algebra: 'Find cross product and take its magnitude.',
    physics: 'Area vectors are used in flux and rotational mechanics.',
    interpretation: 'Cross product magnitude is area.',
    trap: 'Do not use dot product for area.',
    easyExample: 'Sides i and j form area 1.',
    cbseExample: 'Use determinant first, then magnitude.',
    jeeExample: 'For points O, A, B, area is |OA x OB|.',
    advancedTwist: 'Area is invariant under sliding vectors parallel to themselves.',
  },
  {
    id: 'area-triangle',
    title: 'Area of triangle',
    latex: String.raw`\text{Area}=\frac12\lvert\vec A\times\vec B\rvert`,
    meaning: 'Area of triangle formed by two side vectors from the same vertex.',
    geometry: 'It is half the parallelogram area.',
    algebra: 'Compute cross product of two side vectors.',
    physics: 'Same area-vector logic appears in angular momentum geometry.',
    interpretation: 'Triangle area is the half-spread of two vectors.',
    trap: 'Use two vectors from the same initial point.',
    easyExample: 'OA = i, OB = j gives triangle area 1/2.',
    cbseExample: 'For three points, form AB and AC before cross product.',
    jeeExample: 'If cross product magnitude is 10, triangle area is 5.',
    advancedTwist: 'Collinear points give zero triangle area.',
  },
  {
    id: 'direction-cosines',
    title: 'Direction cosines',
    latex: String.raw`l=\cos\alpha,\quad m=\cos\beta,\quad n=\cos\gamma`,
    meaning: 'Cosines of the angles made by a vector with x, y, and z axes.',
    geometry: 'They describe the direction of a 3D vector relative to axes.',
    algebra: 'For A = ai + bj + ck, l = a/|A|, m = b/|A|, n = c/|A|.',
    physics: 'Direction cosines distribute a vector along coordinate axes.',
    interpretation: 'They are components of the unit vector in that direction.',
    trap: 'Direction cosines are not the same as direction ratios unless the vector is already unit length.',
    easyExample: 'For i, direction cosines are 1, 0, 0.',
    cbseExample: 'Show l, m, n by dividing components by magnitude.',
    jeeExample: 'Use l^2 + m^2 + n^2 = 1 to find missing value.',
    advancedTwist: 'Direction cosines are coordinates on the unit sphere.',
  },
  {
    id: 'dc-identity',
    title: 'Direction cosine identity',
    latex: String.raw`l^2+m^2+n^2=1`,
    meaning: 'The squares of direction cosines of a line add to one.',
    geometry: 'The direction-cosine point lies on the unit sphere.',
    algebra: 'It follows from dividing a^2 + b^2 + c^2 by |A|^2.',
    physics: 'Components of a unit direction vector have total squared magnitude one.',
    interpretation: 'Direction cosines are normalized direction ratios.',
    trap: 'Use squares. l + m + n is not generally one.',
    easyExample: 'For (1/sqrt3, 1/sqrt3, 1/sqrt3), squares add to 1.',
    cbseExample: 'Derive from l = a/r, m = b/r, n = c/r.',
    jeeExample: 'If l = 2/3 and m = 1/3, n = +/-2/3.',
    advancedTwist: 'The sign of a direction cosine gives the side of the axis direction.',
  },
  {
    id: 'direction-ratios',
    title: 'Direction ratios',
    latex: String.raw`\text{For }\vec A=a\hat i+b\hat j+c\hat k,\text{ D.R.s are }a,b,c`,
    meaning: 'Any three proportional numbers representing the direction of a vector.',
    geometry: 'They describe slope in x, y, and z directions.',
    algebra: 'Multiplying all direction ratios by the same non-zero constant does not change direction.',
    physics: 'Useful in describing line of action.',
    interpretation: 'Direction ratios need not be normalized.',
    trap: 'Direction ratios are not unique.',
    easyExample: 'Direction ratios of 2i - 3j + k are 2, -3, 1.',
    cbseExample: 'Normalize D.R.s to get direction cosines.',
    jeeExample: 'Parallel lines have proportional direction ratios.',
    advancedTwist: 'Ratios encode a point at infinity along a 3D direction.',
  },
  {
    id: 'scalar-triple',
    title: 'Scalar triple product',
    latex: String.raw`[\vec A\,\vec B\,\vec C]=\vec A\cdot(\vec B\times\vec C)`,
    meaning: 'Signed volume of the parallelepiped formed by A, B, and C.',
    geometry: 'Volume is base area from B x C times height along A.',
    algebra: 'It is a determinant of the three component rows.',
    physics: 'Used in volume, orientation, and coplanarity checks.',
    interpretation: 'Zero scalar triple product means coplanar vectors.',
    trap: 'Changing order can change sign.',
    easyExample: '[i j k] = 1.',
    cbseExample: 'Optional for vectors chapter, useful as an extension.',
    jeeExample: 'Use STP = 0 for coplanarity.',
    advancedTwist: 'It is the 3D orientation detector.',
  },
  {
    id: 'collinearity',
    title: 'Collinearity condition',
    latex: String.raw`\vec A=\lambda\vec B`,
    meaning: 'Two non-zero vectors are collinear when one is a scalar multiple of the other.',
    geometry: 'Their arrows lie on parallel or the same line directions.',
    algebra: 'Component ratios are equal.',
    physics: 'Forces along one line have no turning effect about points on that line.',
    interpretation: 'Collinearity is one-dimensional dependence.',
    trap: 'Equal slopes in two components are not enough in 3D; check all components.',
    easyExample: '2i + 4j and i + 2j are collinear.',
    cbseExample: 'Use scalar multiple form.',
    jeeExample: 'Set ratios equal to find unknown parameters.',
    advancedTwist: 'Collinearity of points can be proved by showing AB = lambda AC.',
  },
  {
    id: 'coplanarity',
    title: 'Coplanarity condition',
    latex: String.raw`\vec A\cdot(\vec B\times\vec C)=0`,
    meaning: 'Three vectors are coplanar when their scalar triple product is zero.',
    geometry: 'They make zero volume.',
    algebra: 'The determinant of their components is zero.',
    physics: 'No 3D volume is spanned by the three directions.',
    interpretation: 'One vector can be expressed as a combination of the other two.',
    trap: 'Coplanar does not mean pairwise parallel.',
    easyExample: 'i, j, i + j are coplanar.',
    cbseExample: 'Use as an enrichment result if your syllabus includes it.',
    jeeExample: 'STP zero is the fastest coplanarity check.',
    advancedTwist: 'Coplanarity is linear dependence in 3D.',
  },
  {
    id: 'work-done',
    title: 'Work as dot product',
    latex: String.raw`W=\vec F\cdot\vec s=Fs\cos\theta`,
    meaning: 'Work done equals the component of force along displacement times displacement.',
    geometry: 'Only the shadow of force along motion contributes.',
    algebra: 'Use component dot product when F and s are given in i, j, k.',
    physics: 'Positive work speeds up, negative work opposes motion, zero work is perpendicular.',
    interpretation: 'Work is along-effect.',
    trap: 'A large perpendicular force can do zero work.',
    easyExample: 'Force 10 N at 60 degrees over 2 m gives W = 10 J.',
    cbseExample: 'State units: joule.',
    jeeExample: 'Use signs of dot product for energy interpretation.',
    advancedTwist: 'Dot product links vector geometry to scalar energy transfer.',
  },
  {
    id: 'torque',
    title: 'Torque as cross product',
    latex: String.raw`\vec \tau=\vec r\times\vec F`,
    meaning: 'Torque measures turning effect of a force about a point.',
    geometry: 'Direction is perpendicular to the plane of r and F.',
    algebra: 'Magnitude is rF sin theta.',
    physics: 'Maximum torque occurs when force is perpendicular to radius vector.',
    interpretation: 'Torque is perpendicular-area effect.',
    trap: 'Force along the radius gives zero torque.',
    easyExample: 'r = i, F = j gives torque k.',
    cbseExample: 'Use right-hand rule for direction.',
    jeeExample: 'Compare torque directions using anti-commutativity.',
    advancedTwist: 'Torque is an axial vector; its direction encodes rotation sense.',
  },
  {
    id: 'head-to-tail',
    title: 'Head-to-tail rule',
    latex: String.raw`\text{Tail of }\vec B\text{ at head of }\vec A\Rightarrow\vec R=\vec A+\vec B`,
    meaning: 'Visual construction for vector addition.',
    geometry: 'The resultant joins initial tail to final head.',
    algebra: 'It matches component addition.',
    physics: 'Successive displacements combine this way.',
    interpretation: 'Path changes, net displacement is the endpoint difference.',
    trap: 'The resultant is not the broken path length.',
    easyExample: '3 east then 4 north gives resultant 5 northeast.',
    cbseExample: 'Draw arrows with clear arrowheads.',
    jeeExample: 'Polygon law follows by repeating head-to-tail construction.',
    advancedTwist: 'Closed polygon means vector sum is zero.',
  },
]

const formulaIdsByCluster = {
  'Language of vectors': ['magnitude-3d', 'unit-vector', 'head-to-tail'],
  'Vector types': ['scalar-multiplication', 'collinearity', 'parallel'],
  'Vector operations': ['addition', 'subtraction', 'scalar-multiplication', 'section-formula'],
  'Components and coordinates': ['magnitude-3d', 'direction-cosines', 'dc-identity', 'direction-ratios'],
  'Dot product family': ['dot-geometry', 'dot-component', 'angle', 'perpendicular', 'scalar-projection', 'vector-projection', 'work-done'],
  'Cross product family': ['cross-magnitude', 'cross-determinant', 'area-parallelogram', 'area-triangle', 'parallel', 'torque'],
  'Exam synthesis': ['addition', 'dot-component', 'cross-determinant', 'scalar-triple', 'coplanarity'],
}

const makeQuickPractice = (title, index) => {
  const a = [index % 5 + 1, (index * 2) % 7 - 3, (index * 3) % 5 + 1]
  const b = [(index * 4) % 7 - 2, index % 6 + 1, (index * 5) % 7 - 3]
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  return {
    mcqs: Array.from({ length: 5 }, (_, q) => ({
      question: `${title}: Which statement is safest for exam use? (${q + 1})`,
      options: [
        'A vector has magnitude and direction.',
        'A vector changes if shifted parallel to itself.',
        'Dot product always gives a vector.',
        'Cross product always gives a scalar.',
      ],
      answer: 0,
      solution: 'A free vector is determined by magnitude and direction. Parallel shifting does not change it in this chapter.',
    })),
    numericals: [
      {
        question: `For A = ${a[0]}i + ${a[1]}j + ${a[2]}k and B = ${b[0]}i + ${b[1]}j + ${b[2]}k, find A dot B.`,
        answer: `${dot}`,
        solution: `A dot B = (${a[0]})(${b[0]}) + (${a[1]})(${b[1]}) + (${a[2]})(${b[2]}) = ${dot}.`,
      },
      {
        question: `Find A + B for A = ${a[0]}i + ${a[1]}j + ${a[2]}k and B = ${b[0]}i + ${b[1]}j + ${b[2]}k.`,
        answer: `${a[0] + b[0]}i + ${a[1] + b[1]}j + ${a[2] + b[2]}k`,
        solution: 'Add corresponding i, j, k components.',
      },
      {
        question: `Find |A|^2 for A = ${a[0]}i + ${a[1]}j + ${a[2]}k.`,
        answer: `${a[0] ** 2 + a[1] ** 2 + a[2] ** 2}`,
        solution: `|A|^2 = ${a[0]}^2 + ${a[1]}^2 + ${a[2]}^2.`,
      },
    ],
    assertionReason: [
      {
        assertion: 'If A dot B = 0 for non-zero vectors, the vectors are perpendicular.',
        reason: 'Dot product equals |A||B|cos theta.',
        answer: 'Both assertion and reason are true, and the reason explains the assertion.',
      },
      {
        assertion: 'If A x B = 0, A and B must have equal magnitude.',
        reason: 'Parallel non-zero vectors have zero cross product.',
        answer: 'Assertion is false, reason is true.',
      },
    ],
    conceptual: `Explain ${title.toLowerCase()} using one geometric sentence and one algebraic sentence.`,
    advancedThinking: `Create a limiting-case example for ${title.toLowerCase()} and explain what changes when a vector becomes zero, parallel, or perpendicular.`,
  }
}

const sections = topicTitles.map((title, index) => {
  const cluster = clusterFor(index)
  return {
    id: slug(title),
    number: index + 1,
    title,
    cluster,
    simple: `${title} is one part of the vector language. Learn what changes in length, direction, component form, and geometry before jumping to formulas.`,
    ncert: `NCERT focus: define the idea precisely, connect it to directed line segments, and use component form only after the geometry is clear.`,
    cbse: `CBSE writing: start with the definition, draw a small labelled diagram where possible, write the formula, substitute values cleanly, and end with units or vector notation.`,
    jeeMain: `JEE Main depth: convert the idea into components quickly, track signs, and use dot or cross product tests to avoid long geometry.`,
    advanced: `Advanced insight: test the edge cases. Check zero vector, parallel vectors, perpendicular vectors, and whether the result is scalar, vector, area, or direction.`,
    definitions: [
      `${title}: exam-ready meaning in the language of magnitude, direction, and components.`,
      'Free vector: a vector that can be shifted parallel to itself without changing its value.',
      'Resultant: a single vector that has the same net effect as two or more vectors.',
    ],
    formulas: formulaIdsByCluster[cluster],
    derivationIdea: `Derive the result for ${title.toLowerCase()} from a right triangle, component addition, cosine rule, or area idea depending on the concept.`,
    geometricalMeaning: `Picture arrows first. Ask what length, angle, shadow, area, or perpendicular direction the concept is measuring.`,
    algebraicMeaning: `Translate the picture into i, j, k components and use independent x, y, z directions.`,
    example: `For A = 2i - j + 2k and B = i + 3j - k, compare A + B, A dot B, and A x B to see how the same two vectors create different outputs.`,
    keyTerms: ['magnitude', 'direction', 'component', 'resultant', 'projection', 'orientation'],
    visualPlan: {
      diagram: `Show ${title.toLowerCase()} with arrows, labelled points, components, and a highlighted final result.`,
      threeD: `Use 3D axes when the concept depends on x, y, z components or perpendicular direction.`,
      simulation: `Let students move components of A and B and watch the formula update live.`,
      animation: 'Animate the arrow construction step by step so the final formula feels inevitable.',
      graph: 'Plot component values and the resulting magnitude or product value.',
      flowchart: `Definition -> visual picture -> component formula -> exam trap for ${title.toLowerCase()}.`,
      infographic: 'Use one compact panel: formula, meaning, trap, and one worked mini-example.',
    },
    memoryHook: `For ${title.toLowerCase()}, remember: draw first, components second, formula third.`,
    commonMistakes: [
      'Using magnitude rules where vector direction matters.',
      'Forgetting sign changes in subtraction, projection, or cross product order.',
    ],
    examTraps: [
      'Zero vector can make a condition algebraically true while direction is undefined.',
      'A dot B and A x B answer different questions: along-effect versus perpendicular-area effect.',
    ],
    ncertLineFocus: 'Write definitions in complete sentences and avoid treating vectors like ordinary numbers.',
    jeeHighYield: 'Every vector problem usually reduces to one of three tests: dot zero, cross zero, or component comparison.',
    quickPractice: makeQuickPractice(title, index + 1),
  }
})

const derivations = [
  {
    id: 'magnitude-2d',
    title: 'Magnitude of a vector in 2D',
    finalFormula: String.raw`\lvert\vec A\rvert=\sqrt{x^2+y^2}`,
    steps: [
      'Represent A as xi + yj, ending at point (x, y).',
      'Drop perpendiculars to form a right triangle with legs |x| and |y|.',
      'By Pythagoras, length squared is x^2 + y^2.',
      'Take the positive square root because magnitude is non-negative.',
    ],
    geometry: 'The vector is the hypotenuse of the component triangle.',
    jeeShortcut: 'Use |A|^2 first to avoid unnecessary square roots.',
    cbseWriting: 'Draw axes, mark components, write Pythagoras, then the final formula.',
    commonMistake: 'Writing x + y instead of sqrt(x^2 + y^2).',
  },
  {
    id: 'magnitude-3d',
    title: 'Magnitude of a vector in 3D',
    finalFormula: String.raw`\lvert\vec A\rvert=\sqrt{x^2+y^2+z^2}`,
    steps: [
      'Take the projection of A on the xy-plane. Its length is sqrt(x^2 + y^2).',
      'Now combine that projected length with the vertical z-component.',
      'Use Pythagoras again: |A|^2 = x^2 + y^2 + z^2.',
      'Magnitude is the positive square root.',
    ],
    geometry: '3D magnitude is two right triangles joined together.',
    jeeShortcut: 'For comparison questions, compare squared magnitudes.',
    cbseWriting: 'Mention that components along i, j, k are mutually perpendicular.',
    commonMistake: 'Ignoring the z-component in a 3D vector.',
  },
  {
    id: 'unit-vector',
    title: 'Unit vector formula',
    finalFormula: String.raw`\hat A=\vec A/\lvert\vec A\rvert`,
    steps: [
      'A unit vector must have magnitude 1.',
      'Dividing a non-zero vector by a positive scalar changes only length, not direction.',
      'Divide A by its own magnitude.',
      'The new magnitude is |A|/|A| = 1.',
    ],
    geometry: 'The arrow points the same way but is resized to one unit.',
    jeeShortcut: 'Vector of magnitude k along A is kA/|A|.',
    cbseWriting: 'State A is non-zero before dividing.',
    commonMistake: 'Trying to find a unit vector along the zero vector.',
  },
  {
    id: 'addition-components',
    title: 'Vector addition component formula',
    finalFormula: String.raw`\vec A+\vec B=(a_1+b_1)\hat i+(a_2+b_2)\hat j+(a_3+b_3)\hat k`,
    steps: [
      'Write both vectors in i, j, k form.',
      'Use the fact that i, j, k directions are independent.',
      'Combine only like components.',
      'The resultant has the combined x, y, z effects.',
    ],
    geometry: 'Head-to-tail construction lands at the same final point as component addition.',
    jeeShortcut: 'Add coordinate triples directly.',
    cbseWriting: 'Group i terms, j terms, and k terms on separate lines if needed.',
    commonMistake: 'Adding magnitudes instead of components.',
  },
  {
    id: 'section-formula',
    title: 'Section formula in vector form',
    finalFormula: String.raw`\vec r=\frac{m\vec B+n\vec A}{m+n}`,
    steps: [
      'Let point P divide AB in ratio AP:PB = m:n.',
      'Then displacement from A to P is m/(m+n) of AB.',
      'Write r = A + [m/(m+n)](B - A).',
      'Simplify to r = (mB + nA)/(m+n).',
    ],
    geometry: 'P is a weighted average of A and B.',
    jeeShortcut: 'Midpoint is the special case m = n = 1.',
    cbseWriting: 'State the ratio clearly before substituting.',
    commonMistake: 'Interchanging m and n weights.',
  },
  {
    id: 'dot-cosine-rule',
    title: 'Dot product from cosine rule',
    finalFormula: String.raw`\vec A\cdot\vec B=\lvert A\rvert\lvert B\rvert\cos\theta`,
    steps: [
      'Place A and B tail-to-tail with angle theta.',
      'The side between their tips has vector A - B.',
      'By cosine rule, |A - B|^2 = |A|^2 + |B|^2 - 2|A||B|cos theta.',
      'By component expansion, |A - B|^2 = |A|^2 + |B|^2 - 2(A dot B).',
      'Compare the two expressions.',
    ],
    geometry: 'Cos theta enters because the triangle between A and B controls the gap between tips.',
    jeeShortcut: 'Use dot product immediately for angle questions.',
    cbseWriting: 'Keep both expansions visible before comparing.',
    commonMistake: 'Using sin theta in dot product.',
  },
  {
    id: 'dot-component',
    title: 'Dot product component formula',
    finalFormula: String.raw`\vec A\cdot\vec B=a_1b_1+a_2b_2+a_3b_3`,
    steps: [
      'Write A and B in i, j, k form.',
      'Expand distributively.',
      'Use i dot i = j dot j = k dot k = 1.',
      'Use dot product of different unit vectors as 0.',
      'Only like-component products remain.',
    ],
    geometry: 'Only same-axis shadows contribute to along-effect.',
    jeeShortcut: 'Multiply corresponding entries and add.',
    cbseWriting: 'Mention orthonormal unit vector properties.',
    commonMistake: 'Forgetting that i dot j = 0.',
  },
  {
    id: 'angle-between',
    title: 'Angle between two vectors',
    finalFormula: String.raw`\theta=\cos^{-1}\frac{\vec A\cdot\vec B}{|A||B|}`,
    steps: [
      'Start from A dot B = |A||B|cos theta.',
      'Divide by |A||B| for non-zero vectors.',
      'Apply inverse cosine to get theta.',
      'Check if the dot product sign makes the angle acute, right, or obtuse.',
    ],
    geometry: 'The sign of dot product previews the angle type.',
    jeeShortcut: 'If dot is 0, skip calculation: theta = 90 degrees.',
    cbseWriting: 'Write the non-zero condition.',
    commonMistake: 'Using the angle each vector makes with x-axis instead of angle between them.',
  },
  {
    id: 'projection',
    title: 'Projection formula',
    finalFormula: String.raw`\operatorname{proj}_{B}A=\frac{A\cdot B}{|B|^2}B`,
    steps: [
      'The scalar projection of A on B is |A|cos theta.',
      'From dot product, |A|cos theta = (A dot B)/|B|.',
      'Direction along B is the unit vector B/|B|.',
      'Multiply scalar projection by B/|B|.',
    ],
    geometry: 'Projection is the shadow of A on B.',
    jeeShortcut: 'Use vector projection to split A into parallel and perpendicular components.',
    cbseWriting: 'Differentiate scalar projection and vector projection.',
    commonMistake: 'Missing the square on |B| in vector projection.',
  },
  {
    id: 'cross-area',
    title: 'Cross product magnitude as parallelogram area',
    finalFormula: String.raw`|A\times B|=|A||B|\sin\theta`,
    steps: [
      'Area of a parallelogram is base times height.',
      'Take base as |A|.',
      'The height from B perpendicular to A is |B|sin theta.',
      'Therefore area = |A||B|sin theta.',
      'Define cross product magnitude to represent this oriented area.',
    ],
    geometry: 'Cross product measures spread perpendicular to the line of A.',
    jeeShortcut: 'Use cross product for area questions immediately.',
    cbseWriting: 'Draw the height clearly.',
    commonMistake: 'Using cos theta instead of sin theta.',
  },
  {
    id: 'cross-determinant',
    title: 'Cross product determinant formula',
    finalFormula: String.raw`A\times B=(a_2b_3-a_3b_2)i-(a_1b_3-a_3b_1)j+(a_1b_2-a_2b_1)k`,
    steps: [
      'Use determinant form with i, j, k in the first row.',
      'Expand along the first row.',
      'The i component uses the yz minor.',
      'The j component has a negative sign.',
      'The k component uses the xy minor.',
    ],
    geometry: 'Each component is an oriented 2D area seen from one axis.',
    jeeShortcut: 'Remember the middle component sign.',
    cbseWriting: 'Use determinant notation then expand.',
    commonMistake: 'Losing the minus sign on j.',
  },
  {
    id: 'triangle-area',
    title: 'Area of triangle using cross product',
    finalFormula: String.raw`\Delta=\frac12|AB\times AC|`,
    steps: [
      'Choose one vertex as common starting point.',
      'Form two side vectors from that vertex.',
      'Their cross product magnitude gives parallelogram area.',
      'A triangle is half of that parallelogram.',
    ],
    geometry: 'Two copies of the triangle make the parallelogram.',
    jeeShortcut: 'For coordinates, form AB and AC first.',
    cbseWriting: 'Show side vectors before determinant.',
    commonMistake: 'Crossing position vectors instead of side vectors for arbitrary points.',
  },
  {
    id: 'direction-cosine-identity',
    title: 'Direction cosine identity',
    finalFormula: String.raw`l^2+m^2+n^2=1`,
    steps: [
      'For vector A = ai + bj + ck, direction cosines are a/r, b/r, c/r.',
      'Square and add them.',
      'The numerator becomes a^2 + b^2 + c^2.',
      'This equals r^2, so the quotient is 1.',
    ],
    geometry: 'Direction cosines are components of a unit vector.',
    jeeShortcut: 'Use the identity to find a missing direction cosine.',
    cbseWriting: 'Define r = |A| before starting.',
    commonMistake: 'Writing l + m + n = 1.',
  },
]

const diagramNames = [
  'Scalar vs vector comparison',
  'Directed line segment',
  'Position vector in 2D',
  'Position vector in 3D',
  'Magnitude of vector',
  'Unit vector formation',
  'Equal vectors',
  'Negative vectors',
  'Parallel vectors',
  'Collinear vectors',
  'Coplanar vectors',
  'Triangle law of vector addition',
  'Parallelogram law of vector addition',
  'Polygon law of vector addition',
  'Vector subtraction as addition of negative vector',
  'Multiplication of vector by scalar',
  '2D vector components',
  '3D vector components',
  'Cartesian vector ai + bj + ck',
  'Direction cosines',
  'Direction ratios',
  'Dot product angle diagram',
  'Projection of vector on another vector',
  'Dot product positive, zero, and negative cases',
  'Perpendicular vectors using dot product',
  'Cross product right-hand rule',
  'Cross product area of parallelogram',
  'Cross product area of triangle',
  'Parallel vectors using cross product',
  'Torque as cross product',
  '3D coordinate axes with vectors',
  '3D vector addition',
  '3D vector subtraction',
  '3D dot product angle visualization',
  '3D cross product perpendicular vector visualization',
]

const renderKinds = ['components', 'triangle', 'parallelogram', 'projection', 'cross', 'axes3d', 'parallel']

const diagrams = diagramNames.map((name, index) => ({
  id: slug(name),
  number: index + 1,
  title: name,
  what: `Shows ${name.toLowerCase()} with clean arrows, labels, and a highlighted result.`,
  labels: ['O', 'A', 'B', 'theta', 'components', 'resultant'].slice(0, 3 + (index % 4)),
  concept: index < 11 ? 'Vector basics' : index < 21 ? 'Operations and components' : index < 30 ? 'Dot/cross meaning' : '3D interpretation',
  confusionRemoved: 'Students see whether the concept is about length, direction, shadow, area, or perpendicular direction.',
  paperMethod: 'Draw axes lightly, mark the initial point, use arrowheads, show dotted components, and label the final vector clearly.',
  digitalMethod: 'Build with responsive SVG for 2D visuals and Three.js arrows for 3D visuals. Keep labels in HTML overlays for readability.',
  type: index >= 30 ? '3D interactive' : index % 3 === 0 ? '2D animated' : '2D SVG',
  render: renderKinds[index % renderKinds.length],
}))

const tables = [
  {
    title: 'Scalar vs Vector',
    columns: ['Feature', 'Scalar', 'Vector'],
    rows: [
      ['Meaning', 'Magnitude only', 'Magnitude and direction'],
      ['Example', 'Mass, time, temperature', 'Displacement, velocity, force'],
      ['Addition', 'Ordinary arithmetic', 'Triangle/parallelogram/component addition'],
      ['Diagram', 'No arrow needed', 'Represented by directed line segment'],
    ],
  },
  {
    title: 'Types of vectors',
    columns: ['Type', 'Meaning', 'Trap'],
    rows: [
      ['Zero vector', 'Magnitude zero', 'Direction is undefined'],
      ['Unit vector', 'Magnitude one', 'It is not always i, j, or k'],
      ['Equal vectors', 'Same magnitude and direction', 'Can be at different locations'],
      ['Negative vector', 'Same magnitude opposite direction', 'A - B is not B - A'],
    ],
  },
  {
    title: 'Dot product vs Cross product',
    columns: ['Feature', 'Dot product', 'Cross product'],
    rows: [
      ['Output', 'Scalar', 'Vector'],
      ['Formula', '|A||B|cos theta', '|A||B|sin theta with direction'],
      ['Measures', 'Along-ness / projection', 'Perpendicular area effect'],
      ['Zero when', 'Perpendicular', 'Parallel'],
    ],
  },
  {
    title: 'Conditions',
    columns: ['Condition', 'Formula', 'Meaning'],
    rows: [
      ['Perpendicular', 'A dot B = 0', 'No shadow along each other'],
      ['Parallel', 'A x B = 0', 'No area spread'],
      ['Collinear points', 'AB = lambda AC', 'Same line'],
      ['Coplanar vectors', 'A dot (B x C) = 0', 'Zero volume'],
    ],
  },
]

const memoryTricks = [
  ['Unit vector', 'Divide by length: direction stays, size becomes 1.'],
  ['Vector addition', 'Head to tail gives final trail.'],
  ['Vector subtraction', 'Minus means add the opposite arrow.'],
  ['Scalar multiplication', 'Positive stretches, negative flips.'],
  ['Dot product', 'Dot asks: how much goes along?'],
  ['Cross product', 'Cross asks: how much area stands out?'],
  ['Projection', 'Projection is the shadow on another vector.'],
  ['Direction cosines', 'Cosines are normalized direction ratios.'],
  ['Perpendicular condition', 'Right angle means dot is zero.'],
  ['Parallel condition', 'No spread means cross is zero.'],
  ['Area using cross product', 'Parallelogram area is cross magnitude.'],
  ['Right-hand rule', 'Curl A to B, thumb gives A cross B.'],
]

const v = (seed) => [
  ((seed * 2) % 7) - 3 || 2,
  ((seed * 3) % 9) - 4 || -1,
  ((seed * 5) % 8) - 3 || 1,
]
const add = (a, b) => a.map((x, i) => x + b[i])
const sub = (a, b) => a.map((x, i) => x - b[i])
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0)
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]
const mag2 = (a) => dot(a, a)
const vecText = (a) => `${a[0]}i ${a[1] < 0 ? '-' : '+'} ${Math.abs(a[1])}j ${a[2] < 0 ? '-' : '+'} ${Math.abs(a[2])}k`

const q = (type, index, body) => ({
  id: `${type}-${String(index).padStart(3, '0')}`,
  type,
  conceptTag: body.conceptTag || 'Vector Algebra',
  difficulty: body.difficulty || 'Medium',
  question: body.question,
  options: body.options || null,
  answer: body.answer,
  solution: body.solution,
  shortcut: body.shortcut || 'Convert the geometry into components before calculating.',
  commonTrap: body.commonTrap || 'Mixing scalar output and vector output.',
})

const questions = []

for (let i = 1; i <= 80; i += 1) {
  const a = v(i)
  const b = v(i + 9)
  const mode = i % 5
  if (mode === 0) {
    questions.push(q('CBSE Practice', i, {
      conceptTag: 'Magnitude',
      difficulty: 'Easy',
      question: `Find |A| for A = ${vecText(a)}.`,
      answer: `sqrt(${mag2(a)})`,
      solution: `|A| = sqrt((${a[0]})^2 + (${a[1]})^2 + (${a[2]})^2) = sqrt(${mag2(a)}).`,
      shortcut: 'Find |A|^2 first, then take the square root.',
      commonTrap: 'Adding components directly.',
    }))
  } else if (mode === 1) {
    const r = add(a, b)
    questions.push(q('CBSE Practice', i, {
      conceptTag: 'Addition',
      difficulty: 'Easy',
      question: `If A = ${vecText(a)} and B = ${vecText(b)}, find A + B.`,
      answer: vecText(r),
      solution: `A + B = (${a[0]} + ${b[0]})i + (${a[1]} + ${b[1]})j + (${a[2]} + ${b[2]})k = ${vecText(r)}.`,
      shortcut: 'Add corresponding components.',
      commonTrap: 'Adding magnitudes instead of i, j, k components.',
    }))
  } else if (mode === 2) {
    const r = sub(a, b)
    questions.push(q('CBSE Practice', i, {
      conceptTag: 'Subtraction',
      difficulty: 'Easy',
      question: `If A = ${vecText(a)} and B = ${vecText(b)}, find A - B.`,
      answer: vecText(r),
      solution: `Subtract corresponding components: A - B = ${vecText(r)}.`,
      shortcut: 'Think A + (-B).',
      commonTrap: 'Reversing A - B into B - A.',
    }))
  } else if (mode === 3) {
    questions.push(q('CBSE Practice', i, {
      conceptTag: 'Dot Product',
      difficulty: 'Medium',
      question: `Compute A dot B for A = ${vecText(a)} and B = ${vecText(b)}.`,
      answer: `${dot(a, b)}`,
      solution: `A dot B = (${a[0]})(${b[0]}) + (${a[1]})(${b[1]}) + (${a[2]})(${b[2]}) = ${dot(a, b)}.`,
      shortcut: 'Multiply matching components only.',
      commonTrap: 'Using cross product determinant for a dot product question.',
    }))
  } else {
    const c = cross(a, b)
    questions.push(q('CBSE Practice', i, {
      conceptTag: 'Cross Product',
      difficulty: 'Medium',
      question: `Find A x B for A = ${vecText(a)} and B = ${vecText(b)}.`,
      answer: vecText(c),
      solution: `A x B = (${a[1]}*${b[2]} - ${a[2]}*${b[1]})i + (${a[2]}*${b[0]} - ${a[0]}*${b[2]})j + (${a[0]}*${b[1]} - ${a[1]}*${b[0]})k = ${vecText(c)}.`,
      shortcut: 'Use determinant expansion and watch the middle sign.',
      commonTrap: 'Writing B x A instead of A x B.',
    }))
  }
}

for (let i = 1; i <= 100; i += 1) {
  const a = v(i + 80)
  const b = v(i + 140)
  const mode = i % 5
  if (mode === 0) {
    questions.push(q('JEE Main Practice', i, {
      conceptTag: 'Angle',
      difficulty: 'Medium',
      question: `For A = ${vecText(a)} and B = ${vecText(b)}, find cos theta, where theta is the angle between them.`,
      answer: `${dot(a, b)}/sqrt(${mag2(a) * mag2(b)})`,
      solution: `cos theta = (A dot B)/(|A||B|) = ${dot(a, b)}/sqrt(${mag2(a)}*${mag2(b)}).`,
      shortcut: 'Keep the answer in exact radical form.',
      commonTrap: 'Forgetting to multiply both magnitudes in the denominator.',
    }))
  } else if (mode === 1) {
    const k = (i % 4) + 2
    const ka = a.map((x) => k * x)
    questions.push(q('JEE Main Practice', i, {
      conceptTag: 'Scalar Multiplication',
      difficulty: 'Easy',
      question: `A vector has direction ${vecText(a)} and magnitude ${k}sqrt(${mag2(a)}). Find the vector.`,
      answer: vecText(ka),
      solution: `The vector is ${k} times ${vecText(a)}, so it is ${vecText(ka)}.`,
      shortcut: 'Magnitude scales by |k| when vector is multiplied by k.',
      commonTrap: 'Normalizing when the target magnitude already matches a scalar multiple.',
    }))
  } else if (mode === 2) {
    const c = cross(a, b)
    questions.push(q('JEE Main Practice', i, {
      conceptTag: 'Area',
      difficulty: 'Medium',
      question: `Find the area of the parallelogram formed by A = ${vecText(a)} and B = ${vecText(b)}.`,
      answer: `sqrt(${mag2(c)})`,
      solution: `Area = |A x B|. A x B = ${vecText(c)}, so area = sqrt(${mag2(c)}).`,
      shortcut: 'Area questions usually want cross product magnitude.',
      commonTrap: 'Using A dot B for area.',
    }))
  } else if (mode === 3) {
    questions.push(q('JEE Main Practice', i, {
      conceptTag: 'Projection',
      difficulty: 'Medium',
      question: `Find the scalar projection of A = ${vecText(a)} on B = ${vecText(b)}.`,
      answer: `${dot(a, b)}/sqrt(${mag2(b)})`,
      solution: `Scalar projection = (A dot B)/|B| = ${dot(a, b)}/sqrt(${mag2(b)}).`,
      shortcut: 'Projection on B divides by |B|, not |A|.',
      commonTrap: 'Confusing scalar projection with vector projection.',
    }))
  } else {
    questions.push(q('JEE Main Practice', i, {
      conceptTag: 'Perpendicularity',
      difficulty: 'Medium',
      question: `Find p if A = pi + ${a[1]}j + ${a[2]}k is perpendicular to B = ${vecText(b)}.`,
      answer: `${-(a[1] * b[1] + a[2] * b[2])}/${b[0]}`,
      solution: `Perpendicular means A dot B = 0, so p(${b[0]}) + (${a[1]})(${b[1]}) + (${a[2]})(${b[2]}) = 0.`,
      shortcut: 'Set dot product equal to zero.',
      commonTrap: 'Using cross product zero, which tests parallel vectors.',
    }))
  }
}

for (let i = 1; i <= 40; i += 1) {
  const a = v(i + 230)
  const b = v(i + 300)
  questions.push(q('JEE Advanced Thinking', i, {
    conceptTag: i % 2 ? 'Conceptual Geometry' : 'Optimization',
    difficulty: 'Hard',
    question: i % 2
      ? `A and B are non-zero vectors with fixed magnitudes. When is |A + B| maximum and when is it minimum? Use vector geometry.`
      : `For A = ${vecText(a)}, describe all vectors X perpendicular to A. What geometric object do their tips form if tails are at origin?`,
    answer: i % 2
      ? 'Maximum when parallel in same direction, minimum when opposite direction.'
      : 'All X satisfying A dot X = 0; tips lie on a plane through the origin perpendicular to A.',
    solution: i % 2
      ? 'Use |A+B|^2 = |A|^2 + |B|^2 + 2A dot B. The dot product is largest for same direction and smallest for opposite direction.'
      : 'The equation ax + by + cz = 0 is a plane through origin. Its normal vector is A.',
    shortcut: 'Square magnitudes to convert geometry into dot product.',
    commonTrap: 'Thinking perpendicular vectors form only one line in 3D.',
  }))
}

for (let i = 1; i <= 30; i += 1) {
  questions.push(q('Assertion-Reason', i, {
    conceptTag: i % 2 ? 'Dot Product' : 'Cross Product',
    difficulty: 'Medium',
    question: `Assertion: ${i % 2 ? 'If two non-zero vectors are perpendicular, their dot product is zero.' : 'If two non-zero vectors are parallel, their cross product is zero.'} Reason: ${i % 2 ? 'Dot product contains cos theta.' : 'Cross product magnitude contains sin theta.'}`,
    options: [
      'Both A and R are true, and R explains A.',
      'Both A and R are true, but R does not explain A.',
      'A is true, R is false.',
      'A is false, R is true.',
    ],
    answer: 'Both A and R are true, and R explains A.',
    solution: i % 2
      ? 'For theta = 90 degrees, cos theta = 0, so A dot B = 0.'
      : 'For theta = 0 or 180 degrees, sin theta = 0, so |A x B| = 0.',
    shortcut: 'Memorize dot-zero perpendicular and cross-zero parallel.',
    commonTrap: 'Ignoring the non-zero vector condition.',
  }))
}

for (let i = 1; i <= 30; i += 1) {
  const a = v(i + 360)
  const b = v(i + 410)
  const c = cross(a, b)
  const mode = i % 3
  questions.push(q('Integer Type', i, {
    conceptTag: mode === 0 ? 'Dot Product' : mode === 1 ? 'Magnitude' : 'Cross Product',
    difficulty: 'Medium',
    question: mode === 0
      ? `If A = ${vecText(a)} and B = ${vecText(b)}, enter A dot B.`
      : mode === 1
        ? `If A = ${vecText(a)}, enter |A|^2.`
        : `If A = ${vecText(a)} and B = ${vecText(b)}, enter |A x B|^2.`,
    answer: mode === 0 ? `${dot(a, b)}` : mode === 1 ? `${mag2(a)}` : `${mag2(c)}`,
    solution: mode === 0
      ? 'Multiply corresponding components and add.'
      : mode === 1
        ? 'Square each component and add.'
        : 'Find cross product, then square and add its components.',
    shortcut: 'Use squared values for integer answers.',
    commonTrap: 'Taking square roots when the question asks for squared magnitude.',
  }))
}

for (let i = 1; i <= 20; i += 1) {
  questions.push(q('Match the Column', i, {
    conceptTag: 'Formula Matching',
    difficulty: 'Medium',
    question: 'Match Column I with Column II: (A) A dot B, (B) A x B, (C) proj_B A, (D) |A x B|.',
    answer: 'A -> scalar along-effect, B -> perpendicular vector, C -> shadow vector on B, D -> parallelogram area.',
    solution: 'Dot product gives scalar along-effect. Cross product gives perpendicular vector. Projection gives shadow. Cross magnitude gives area.',
    shortcut: 'Dot = along, cross = area/out.',
    commonTrap: 'Calling cross product a scalar.',
  }))
}

for (let i = 1; i <= 20; i += 1) {
  questions.push(q('Diagram Based', i, {
    conceptTag: 'Visual Interpretation',
    difficulty: 'Easy',
    question: `A diagram shows vector B placed with its tail at the head of vector A. Which vector joins the first tail to the final head?`,
    answer: 'A + B',
    solution: 'This is the head-to-tail construction of vector addition.',
    shortcut: 'First tail to final head is the resultant.',
    commonTrap: 'Choosing A - B because two arrows are visible.',
  }))
}

for (let i = 1; i <= 20; i += 1) {
  questions.push(q('3D Visualization', i, {
    conceptTag: '3D Axes',
    difficulty: 'Medium',
    question: `In a 3D diagram, vector A has endpoint (${i % 5}, ${(i + 2) % 6}, ${(i + 3) % 4}). What are its direction ratios?`,
    answer: `${i % 5}, ${(i + 2) % 6}, ${(i + 3) % 4}`,
    solution: 'For a position vector from origin, direction ratios are its x, y, z components.',
    shortcut: 'Endpoint coordinates are component coefficients for origin-based position vectors.',
    commonTrap: 'Normalizing direction ratios unnecessarily.',
  }))
}

for (let i = 1; i <= 20; i += 1) {
  const a = v(i + 520)
  const b = v(i + 540)
  questions.push(q('Dot Product', i, {
    conceptTag: 'Dot Product',
    difficulty: 'Medium',
    question: `For A = ${vecText(a)} and B = ${vecText(b)}, decide if the angle is acute, right, or obtuse.`,
    answer: dot(a, b) > 0 ? 'Acute' : dot(a, b) < 0 ? 'Obtuse' : 'Right',
    solution: `A dot B = ${dot(a, b)}. Positive means acute, zero means right, negative means obtuse.`,
    shortcut: 'Only the sign of dot product is needed.',
    commonTrap: 'Calculating the full angle when sign is enough.',
  }))
}

for (let i = 1; i <= 20; i += 1) {
  const a = v(i + 620)
  const b = v(i + 700)
  const c = cross(a, b)
  questions.push(q('Cross Product', i, {
    conceptTag: 'Cross Product',
    difficulty: 'Medium',
    question: `For A = ${vecText(a)} and B = ${vecText(b)}, find whether A x B is zero.`,
    answer: mag2(c) === 0 ? 'Zero vector' : `Non-zero; A x B = ${vecText(c)}`,
    solution: `A x B = ${vecText(c)}. Its squared magnitude is ${mag2(c)}.`,
    shortcut: 'Parallel non-zero vectors give zero cross product.',
    commonTrap: 'Testing parallelism with dot product zero.',
  }))
}

for (let i = 1; i <= 10; i += 1) {
  questions.push(q('Case Based', i, {
    conceptTag: 'Mixed Vectors',
    difficulty: 'Medium',
    question: `A drone moves 3i + 4j meters, then -i + 2k meters, then a correction vector C. If it must end at 5i + 4j + 2k, find C.`,
    answer: '3i + 0j + 0k',
    solution: 'First two moves add to 2i + 4j + 2k. Required final vector is 5i + 4j + 2k, so C = 3i.',
    shortcut: 'Correction vector = target resultant - current resultant.',
    commonTrap: 'Adding the target instead of subtracting current position from target.',
  }))
}

const revision = {
  top25Formulas: formulas.slice(0, 25).map((f) => ({ title: f.title, latex: f.latex, trap: f.trap })),
  top20Concepts: [
    'Magnitude is length, direction is orientation.',
    'Equal vectors can be located differently.',
    'Vector addition combines effects, not just sizes.',
    'Subtraction means adding the negative vector.',
    'Scalar multiplication can reverse direction.',
    'Unit vector is direction only.',
    'Dot product gives a scalar along-effect.',
    'cos theta appears because dot product measures projection.',
    'Dot product zero means perpendicular for non-zero vectors.',
    'Projection is a shadow.',
    'Cross product gives a perpendicular vector.',
    'sin theta appears because cross product measures area height.',
    'A x B is the negative of B x A.',
    'Cross product zero means parallel for non-zero vectors.',
    'Area of parallelogram is |A x B|.',
    'Area of triangle is half |A x B|.',
    'Direction cosines are normalized components.',
    'l^2 + m^2 + n^2 = 1.',
    'Collinearity uses scalar multiple form.',
    'Coplanarity uses zero scalar triple product.',
  ],
  top15Traps: [
    'Adding vector magnitudes instead of components.',
    'Forgetting zero vector has no definite direction.',
    'Confusing scalar projection and vector projection.',
    'Using dot product for area.',
    'Using cross product for perpendicular condition.',
    'Missing the middle sign in determinant expansion.',
    'Reversing A x B and B x A.',
    'Writing l + m + n = 1.',
    'Treating direction ratios as unique.',
    'Using position vectors instead of side vectors for triangle area.',
    'Forgetting non-zero condition in parallel/perpendicular tests.',
    'Mixing AP:PB weights in section formula.',
    'Not checking sign of dot product for angle type.',
    'Normalizing when only direction ratios are asked.',
    'Calling cross product magnitude a vector.',
  ],
  top10Diagrams: diagrams.slice(0, 10).map((d) => d.title),
  top10ThreeDIdeas: [
    'Axes with vector endpoint and dotted component box',
    'Head-to-tail vector addition',
    'A - B as A + (-B)',
    'Scalar multiplication with direction flip',
    'Dot product angle and projection shadow',
    'Cross product perpendicular arrow',
    'Right-hand rule orientation switch',
    'Parallelogram area panel',
    'Triangle area half-panel',
    'Direction cosines on unit sphere',
  ],
  top10QuestionTypes: [
    'Find magnitude',
    'Find unit vector',
    'Add or subtract vectors',
    'Find section point',
    'Find angle using dot product',
    'Find projection',
    'Check perpendicularity',
    'Find cross product',
    'Area using cross product',
    'Check parallel/collinear/coplanar',
  ],
  thirtyMinutePlan: [
    '5 min: revise vector types and component form.',
    '6 min: dot product formulas and projection.',
    '6 min: cross product, area, and right-hand rule.',
    '5 min: direction cosines and section formula.',
    '5 min: traps list.',
    '3 min: solve two mixed examples.',
  ],
  lastDayPlan: [
    'Read the one-page sheet twice.',
    'Solve 10 CBSE direct problems.',
    'Solve 10 JEE mixed objective problems.',
    'Redo all mistakes from dot/cross/projection.',
    'Practice drawing triangle, parallelogram, and projection diagrams.',
  ],
  examHallStrategy: [
    'Identify whether the question asks length, shadow, area, direction, or condition.',
    'Write vectors in component form immediately.',
    'Use dot for angle/projection/perpendicular.',
    'Use cross for area/perpendicular vector/parallel.',
    'Keep exact radical form unless decimal is demanded.',
  ],
  finalChecklist: [
    'I can explain why vectors need magnitude and direction.',
    'I can draw addition and subtraction diagrams.',
    'I can derive magnitude, dot product, projection, cross product area, and direction cosine identity.',
    'I can solve CBSE board-style steps neatly.',
    'I can solve JEE Main component questions quickly.',
    'I can explain right-hand rule and why A x B = -(B x A).',
  ],
}

writeJson('sections.json', sections)
writeJson('formulas.json', formulas)
writeJson('derivations.json', derivations)
writeJson('diagrams.json', diagrams)
writeJson('questions.json', questions)
writeJson('revision.json', revision)
writeJson('tables.json', tables)
writeJson('memoryTricks.json', memoryTricks)

console.log(`Generated ${sections.length} sections, ${formulas.length} formulas, ${derivations.length} derivations, ${diagrams.length} diagrams, and ${questions.length} questions.`)
