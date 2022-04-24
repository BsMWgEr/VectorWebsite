import os
import datetime

# IAM User

AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_DEFAULT_REGION = os.environ['AWS_DEFAULT_REGION']
AWS_ACL_POLICY = 'public-read'
AWS_BUCKET_NAME = os.environ['AWS_BUCKET_NAME']



AWS_PRELOAD_METADATA = True


#django storges files storage
DEFAULT_FILE_STORAGE = 'stockvectorrigs.aws.storages.MediaS3Storage'

STATICFILES_STORAGE = 'stockvectorrigs.aws.storages.StaticS3Storage'
#django storages login
AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY
AWS_STORAGE_BUCKET_NAME = 'stockvectorrigs'

AWS_DEFAULT_ACL = 'public-read'
AWS_BUCKET_ACL = None
AWS_AUTO_CREATE_BUCKET = False

two_months = datetime.timedelta(days=31)
date_two_months_later = datetime.date.today() + two_months
expires = date_two_months_later.strftime("%A, %d %B %Y 20:00:00 GMT")
AWS_HEADERS = {
 'Expires': expires,
 'Cache-Control': 'max-age=%d' % (int(two_months.total_seconds()), ),
}

AWS_QUERYSTRING_AUTH = False
AWS_QUERYSTRING_EXPIRE = 3600
AWS_S3_FILE_OVERWRITE = True

AWS_S3_REGION_NAME = AWS_DEFAULT_REGION



S3DIRECT_REGION = 'us-east-1'
S3_URL = '//%s.s3.amazonaws.com/' % AWS_STORAGE_BUCKET_NAME
MEDIA_URL = '//%s.s3.amazonaws.com/media/' % AWS_STORAGE_BUCKET_NAME
MEDIA_ROOT = MEDIA_URL
STATIC_URL = S3_URL + 'static/'
ADMIN_MEDIA_PREFIX = STATIC_URL + 'admin/'
PROTECTED_DIR_NAME = 'protected'
PROTECTED_MEDIA_URL = '//%s.s3.amazonaws.com/%s/' % (AWS_STORAGE_BUCKET_NAME, PROTECTED_DIR_NAME)

AWS_DOWNLOAD_EXPIRE = 10000 #(0ptional, in milliseconds)