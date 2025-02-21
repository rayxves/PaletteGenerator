import * as tf from "@tensorflow/tfjs";

interface Color {
  r: number;
  g: number;
  b: number;
}

export async function extractColors(imageData: ImageData, numColors = 5) {
  return new Promise<Color[]>((resolve) => {
    setTimeout(async () => {
      const pixels = tf.browser.fromPixels(imageData).toFloat();
      const reshaped = pixels.reshape([-1, 3]);

      const sampleIndices = tf.tensor1d(
        Array.from(
          tf.util.createShuffledIndices(reshaped.shape[0]).slice(0, numColors)
        ),
        "int32"
      );
      const centroids = tf.variable(tf.gather(reshaped, sampleIndices));

      for (let i = 0; i < 20; i++) {
        const distances = tf
          .sub(reshaped.expandDims(1), centroids.expandDims(0))
          .square()
          .sum(2);

        const clusterAssignments = distances.argMin(1);
        const newCentroidsPromises = [];

        for (let j = 0; j < numColors; j++) {
          const mask = clusterAssignments.equal(j);
          const clusterPixelsPromise = tf.booleanMaskAsync(reshaped, mask).then((clusterPixels) => {
            if (clusterPixels.size > 0) {
              return clusterPixels.mean(0).reshape([3]);
            } else {
              return centroids.slice([j, 0], [1, 3]).squeeze();
            }
          });

          newCentroidsPromises.push(clusterPixelsPromise);
        }

        const newCentroids = await Promise.all(newCentroidsPromises);

        centroids.assign(tf.stack(newCentroids));
      }

      const colorsArray = centroids.arraySync() as number[][];
      const colors = colorsArray.map(([r, g, b]) => ({
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b),
      }));

      resolve(colors);
    }, 0);
  });
}
