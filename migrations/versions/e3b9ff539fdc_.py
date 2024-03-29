"""empty message

Revision ID: e3b9ff539fdc
Revises: 966b3b2930c3
Create Date: 2024-01-25 18:28:31.624760

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3b9ff539fdc'
down_revision = '966b3b2930c3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('animals_images', schema=None) as batch_op:
        batch_op.add_column(sa.Column('public_id', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('animals_images', schema=None) as batch_op:
        batch_op.drop_column('public_id')

    # ### end Alembic commands ###
