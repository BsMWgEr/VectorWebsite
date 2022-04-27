from rest_framework import serializers


from backend.models import Media


class S3FileSerializer(serializers.ModelSerializer):
    raw_filename = serializers.CharField(write_only=True) # forms.CharField
    class Meta:
        model = Media
        fields = [
            'raw_filename',
            'name',
            'filetype'
        ]