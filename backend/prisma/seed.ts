import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Categorias
  const categorias = await Promise.all([
    prisma.category.create({ data: { name: 'Eletrônicos' } }),
    prisma.category.create({ data: { name: 'Alimentos' } }),
    prisma.category.create({ data: { name: 'Vestuário' } }),
    prisma.category.create({ data: { name: 'Móveis' } }),
    prisma.category.create({ data: { name: 'Livros' } }),
  ]);

  // Fornecedores
  const fornecedores = await Promise.all([
    prisma.supplier.create({ data: { name: 'Tech Supply Ltda', email: 'contato@techsupply.com', phone: '(11) 98765-4321', address: 'Av. Paulista, 1000 - São Paulo' } }),
    prisma.supplier.create({ data: { name: 'Alimentos Brasil', email: 'vendas@alimentosbrasil.com', phone: '(21) 97654-3210', address: 'Rua das Flores, 500 - Rio de Janeiro' } }),
    prisma.supplier.create({ data: { name: 'Moda & Estilo', email: 'contato@modaestilo.com', phone: '(31) 96543-2109', address: 'Av. Afonso Pena, 200 - Belo Horizonte' } }),
  ]);

  // Clientes
  const clientes = await Promise.all([
    prisma.customer.create({ data: { name: 'João Silva', email: 'joao.silva@email.com', phone: '(11) 91234-5678', address: 'Rua A, 123 - São Paulo' } }),
    prisma.customer.create({ data: { name: 'Maria Santos', email: 'maria.santos@email.com', phone: '(21) 92345-6789', address: 'Rua B, 456 - Rio de Janeiro' } }),
    prisma.customer.create({ data: { name: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', phone: '(31) 93456-7890', address: 'Rua C, 789 - Belo Horizonte' } }),
    prisma.customer.create({ data: { name: 'Ana Costa', email: 'ana.costa@email.com', phone: '(41) 94567-8901', address: 'Rua D, 321 - Curitiba' } }),
    prisma.customer.create({ data: { name: 'Carlos Ferreira', email: 'carlos.ferreira@email.com', phone: '(51) 95678-9012', address: 'Rua E, 654 - Porto Alegre' } }),
  ]);

  // Produtos
  const produtos = await Promise.all([
    prisma.product.create({ data: { name: 'Notebook Dell Inspiron', price: 3500.00, stock: 15, categoryId: categorias[0].id, supplierId: fornecedores[0].id } }),
    prisma.product.create({ data: { name: 'Mouse Logitech MX Master', price: 450.00, stock: 30, categoryId: categorias[0].id, supplierId: fornecedores[0].id } }),
    prisma.product.create({ data: { name: 'Teclado Mecânico RGB', price: 350.00, stock: 25, categoryId: categorias[0].id, supplierId: fornecedores[0].id } }),
    prisma.product.create({ data: { name: 'Monitor LG 27"', price: 1200.00, stock: 8, categoryId: categorias[0].id, supplierId: fornecedores[0].id } }),
    prisma.product.create({ data: { name: 'Café Premium 500g', price: 25.00, stock: 100, categoryId: categorias[1].id, supplierId: fornecedores[1].id } }),
    prisma.product.create({ data: { name: 'Chocolate Belga 200g', price: 35.00, stock: 80, categoryId: categorias[1].id, supplierId: fornecedores[1].id } }),
    prisma.product.create({ data: { name: 'Biscoito Integral 300g', price: 12.00, stock: 150, categoryId: categorias[1].id, supplierId: fornecedores[1].id } }),
    prisma.product.create({ data: { name: 'Camiseta Básica', price: 45.00, stock: 60, categoryId: categorias[2].id, supplierId: fornecedores[2].id } }),
    prisma.product.create({ data: { name: 'Calça Jeans', price: 120.00, stock: 40, categoryId: categorias[2].id, supplierId: fornecedores[2].id } }),
    prisma.product.create({ data: { name: 'Tênis Esportivo', price: 280.00, stock: 5, categoryId: categorias[2].id, supplierId: fornecedores[2].id } }),
    prisma.product.create({ data: { name: 'Cadeira de Escritório', price: 650.00, stock: 12, categoryId: categorias[3].id, supplierId: fornecedores[0].id } }),
    prisma.product.create({ data: { name: 'Mesa de Jantar', price: 1500.00, stock: 6, categoryId: categorias[3].id, supplierId: fornecedores[0].id } }),
    prisma.product.create({ data: { name: 'Livro: Clean Code', price: 85.00, stock: 20, categoryId: categorias[4].id, supplierId: fornecedores[1].id } }),
    prisma.product.create({ data: { name: 'Livro: Design Patterns', price: 95.00, stock: 15, categoryId: categorias[4].id, supplierId: fornecedores[1].id } }),
  ]);

  // Vendas
  const venda1 = await prisma.sale.create({
    data: {
      customerId: clientes[0].id,
      total: 3950.00,
      items: {
        create: [
          { productId: produtos[0].id, quantity: 1, price: 3500.00 },
          { productId: produtos[1].id, quantity: 1, price: 450.00 },
        ]
      }
    }
  });

  const venda2 = await prisma.sale.create({
    data: {
      customerId: clientes[1].id,
      total: 1550.00,
      items: {
        create: [
          { productId: produtos[3].id, quantity: 1, price: 1200.00 },
          { productId: produtos[2].id, quantity: 1, price: 350.00 },
        ]
      }
    }
  });

  const venda3 = await prisma.sale.create({
    data: {
      customerId: clientes[2].id,
      total: 400.00,
      items: {
        create: [
          { productId: produtos[8].id, quantity: 2, price: 120.00 },
          { productId: produtos[7].id, quantity: 4, price: 45.00 },
        ]
      }
    }
  });

  // Movimentações de estoque
  await Promise.all([
    prisma.stockMovement.create({ data: { productId: produtos[0].id, type: 'entry', quantity: 20, reason: 'Compra inicial' } }),
    prisma.stockMovement.create({ data: { productId: produtos[1].id, type: 'entry', quantity: 50, reason: 'Reposição' } }),
    prisma.stockMovement.create({ data: { productId: produtos[9].id, type: 'exit', quantity: 3, reason: 'Venda' } }),
  ]);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
