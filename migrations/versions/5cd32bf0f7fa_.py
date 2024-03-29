"""empty message

Revision ID: 5cd32bf0f7fa
Revises: a9884e243b89
Create Date: 2024-02-05 18:17:23.556815

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5cd32bf0f7fa'
down_revision = 'a9884e243b89'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('adoption_users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('registration_date', sa.Date(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('adoption_users', schema=None) as batch_op:
        batch_op.drop_column('registration_date')

    # ### end Alembic commands ###
