from rest_framework import serializers


from backend.models import Image


class S3FileSerializer(serializers.ModelSerializer):
    raw_filename = serializers.CharField(write_only=True) # forms.CharField
    class Meta:
        model = Image
        fields = [
            'raw_filename',
            'name',
            'filetype'
        ]