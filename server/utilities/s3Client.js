import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_USER_ACCESS_KEY,
    secretAccessKey: process.env.S3_USER_SECRET_ACCESS_KEY,
  },
});

const putObject = async (key, buffer, mimeType) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
};

const getObject = async (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  return url;
};

export { putObject, getObject };
