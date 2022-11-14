from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError


def valid_annotation(form, field):
    annotation = field.data
    if len(annotation) < 1 or len(annotation) > 500:
        raise ValidationError('Annotation must be between 1 and 500 characters')

class AnnotationForm(FlaskForm):
    annotation_body = TextAreaField("Annotation", validators=[DataRequired(), valid_annotation])
    submit = SubmitField('Submit')