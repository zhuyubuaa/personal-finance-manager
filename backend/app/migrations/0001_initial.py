# Generated by Django 4.2.7 on 2023-11-24 03:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Account",
            fields=[
                ("a_id", models.AutoField(primary_key=True, serialize=False)),
                ("a_name", models.CharField(max_length=50)),
                ("remaining", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="AccountBook",
            fields=[
                ("ab_id", models.AutoField(primary_key=True, serialize=False)),
                ("ab_name", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Type",
            fields=[
                (
                    "type_name",
                    models.CharField(max_length=50, primary_key=True, serialize=False),
                ),
                ("is_out", models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("u_id", models.IntegerField(primary_key=True, serialize=False)),
                ("u_name", models.CharField(max_length=50)),
                ("password", models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="Log",
            fields=[
                ("l_id", models.AutoField(primary_key=True, serialize=False)),
                ("time", models.DateTimeField()),
                ("l_amount", models.FloatField()),
                ("remark", models.CharField(max_length=100, null=True)),
                (
                    "a",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.account",
                    ),
                ),
                (
                    "ab",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.accountbook",
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        default="Dining",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.type",
                        verbose_name="type_name",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Budget",
            fields=[
                ("b_id", models.AutoField(primary_key=True, serialize=False)),
                ("b_amount", models.FloatField()),
                (
                    "ab",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.accountbook",
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        default="Dining",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.type",
                        verbose_name="type_name",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="accountbook",
            name="u",
            field=models.ForeignKey(
                default=21373074,
                on_delete=django.db.models.deletion.CASCADE,
                to="app.user",
            ),
        ),
        migrations.AddField(
            model_name="account",
            name="u",
            field=models.ForeignKey(
                default=21373074,
                on_delete=django.db.models.deletion.CASCADE,
                to="app.user",
            ),
        ),
    ]
