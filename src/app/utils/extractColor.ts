import * as tf from "@tensorflow/tfjs";

export async function extractColors(imageData: ImageData, numColors = 5) {
  const pixels = tf.browser.fromPixels(imageData).toFloat();
  const normalized = pixels.div(255);
  const reshaped = normalized.reshape([-1, 3]);
  const centroids = tf.variable(tf.randomUniform([numColors, 3]));
  for (let i = 0; i < 10; i++) {
    const distances = tf
      .sub(reshaped.expandDims(1), centroids.expandDims(0))
      .square()
      .sum(2);

    const clusterAssignments = distances.argMin(1);
    const newCentroids = [];

    for (let j = 0; j < numColors; j++) {
      const clusterPixels = reshaped.gather(
        clusterAssignments.equal(j).toInt().expandDims(1).tile([1, 3])
      );

      const meanColor = clusterPixels.mean();
      newCentroids.push(meanColor);
    }

    centroids.assign(tf.stack(newCentroids));
  }

  const colorsArray = centroids.arraySync() as number[][];

  const colors = [];

  for (let i = 0; i < colorsArray.length; i++) {
    const color = colorsArray[i];

    colors.push({
      r: Math.round(color[0] * 255),
      g: Math.round(color[1] * 255),
      b: Math.round(color[2] * 255),
    });
  }

  return colors;
}
