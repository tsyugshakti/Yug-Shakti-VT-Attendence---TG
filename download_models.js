const fs = require('fs');
const path = require('path');
const https = require('https');

const modelsDir = path.join(__dirname, 'models');
const jsDir = path.join(__dirname, 'js');

if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir);
if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);

const filesToDownload = [
  { url: 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js', dest: path.join(jsDir, 'face-api.min.js') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-weights_manifest.json', dest: path.join(modelsDir, 'ssd_mobilenetv1_model-weights_manifest.json') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-shard1', dest: path.join(modelsDir, 'ssd_mobilenetv1_model-shard1') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-shard2', dest: path.join(modelsDir, 'ssd_mobilenetv1_model-shard2') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json', dest: path.join(modelsDir, 'face_landmark_68_model-weights_manifest.json') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-shard1', dest: path.join(modelsDir, 'face_landmark_68_model-shard1') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-weights_manifest.json', dest: path.join(modelsDir, 'face_recognition_model-weights_manifest.json') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard1', dest: path.join(modelsDir, 'face_recognition_model-shard1') },
  { url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard2', dest: path.join(modelsDir, 'face_recognition_model-shard2') }
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
         return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading face-api models and library...');
  for (const file of filesToDownload) {
    try {
      await downloadFile(file.url, file.dest);
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log('All downloads finished.');
}

run();
