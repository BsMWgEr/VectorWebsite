import boto3
import datetime
from django.conf import settings
import os
# import from elsewhere
# Django "settings" module

AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_DEFAULT_REGION = os.environ['AWS_DEFAULT_REGION']
AWS_BUCKET_NAME = os.environ['AWS_BUCKET_NAME']

AWS_S3_REGION_NAME = AWS_DEFAULT_REGION
AWS_STORAGE_BUCKET_NAME = 'stockvectorrigs'
AWS_OBJECT_DOWNLOAD_HOURS = 10


class AWS:
    access_key = AWS_ACCESS_KEY_ID
    secret_key = AWS_SECRET_ACCESS_KEY
    region = AWS_S3_REGION_NAME
    bucket = AWS_STORAGE_BUCKET_NAME
    s3_client = None
    client = None
    session = None
    s3_session = None

    def __init__(self, *args, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def get_session(self):
        if self.session is None:
            session = boto3.Session(
                aws_access_key_id=self.access_key,
                aws_secret_access_key=self.secret_key,
                region_name=self.region
            )
            self.session = session
        return self.session

    def get_client(self, service='s3'):
        if self.client is None:
            client = boto3.client(service,
                                  aws_access_key_id=self.access_key,
                                  aws_secret_access_key=self.secret_key,
                                  region_name=self.region
                                  )
            self.client = client
        return self.client

    def get_s3_client(self):
        if self.s3_client is None:
            s3_client = self.get_client(service='s3')
            if s3_client is None:
                return None
            self.s3_client = s3_client
        return self.s3_client

    def get_s3_session(self):
        if self.s3_session is None:
            session = self.get_session()
            if session is None:
                return None  # Raise some error
            s3_session = session.resource("s3")
            self.s3_session = s3_session
        return self.s3_session

    def get_download_url(self, force_download=False, key=None, expires_in=AWS_OBJECT_DOWNLOAD_HOURS):
        """
        For any key, grab a signed url, that expires
        """
        if key is None:
            return ""
        s3_client = self.get_s3_client()
        if s3_client is None:
            return ""

        url = s3_client.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': self.bucket,
                'Key': key,
                'ContentType': 'image/jpeg',

            },
            ExpiresIn=datetime.timedelta(hours=expires_in).total_seconds()
        )
        return url

    def presign_post_url(self, key=None, is_public=True):
        acl = 'private'
        if is_public:
            acl = 'public-read'
        fields = {"acl": acl}
        conditions = [
            {"acl": acl}
        ]
        if key is None:
            return ""
        s3_client = self.get_s3_client()
        if s3_client is None:
            return ""
        data = s3_client.generate_presigned_post(
            Bucket=self.bucket,
            Key=key,
            Fields=fields,
            Conditions=conditions
        )
        return data
