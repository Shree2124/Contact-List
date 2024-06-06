from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class ContactList(models.Model):
    # id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=55, unique=True)
    lastName = models.CharField(max_length=55)
    mobileNumber = models.BigIntegerField(validators=[
        MinValueValidator(6000000000),  
        MaxValueValidator(9999999999) 
    ])
    createdAt = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.firstName + " " +self.lastName
    
