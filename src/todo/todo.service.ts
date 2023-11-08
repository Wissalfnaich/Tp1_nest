import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Like } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async addTodo(todo: TodoEntity): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create(todo); // Crée une nouvelle instance de TodoEntity
    return this.todoRepository.save(newTodo); // Ajoute le Todo à la base de données et renvoie l'instance ajoutée
  }
  /**
   *
   * @param id
   * @param updateData
   * @returns
   */
  async updateTodo(
    id: number,
    updateData: Partial<TodoEntity>,
  ): Promise<TodoEntity> {
    // Recherchez le Todo par son ID.
    const todo = await this.todoRepository.preload({ id, ...updateData });

    // Si le Todo n'existe pas, lancez une exception ou renvoyez un message d'erreur.
    if (!todo) {
      throw new NotFoundException("Le Todo n'a pas été trouvé.");
    }

    // Appliquez les modifications à l'objet Todo.
    //Object.assign(todo, updateData);

    // Enregistrez les modifications dans la base de données.
    await this.todoRepository.save(todo);

    return todo;
  }
  async deleteTodo(id: number): Promise<void> {
    // Supprimez le Todo par son ID.
    const result = await this.todoRepository.delete(id);

    // Vérifiez si un enregistrement a été supprimé.
    if (result.affected === 0) {
      throw new Error(
        "Le Todo n'a pas été trouvé ou n'a pas pu être supprimé.",
      );
    }
  }
  async deleteTodoSoft(id: number): Promise<void> {
    // Recherchez le Todo par son ID.
    const todo = await this.todoRepository.findOne({ where: { id } });

    // Si le Todo n'existe pas, lancez une exception ou renvoyez un message d'erreur.
    if (!todo) {
      throw new Error("Le Todo n'a pas été trouvé.");
    }

    // Définissez la date de suppression douce (soft delete).
    todo.deletedAt = new Date();

    // Enregistrez les modifications dans la base de données.
    await this.todoRepository.save(todo);
  }
  async restoreTodo(id: number): Promise<TodoEntity> {
    // Recherchez le Todo par son ID.
    const todo = await this.todoRepository.findOne({ where: { id } });

    // Si le Todo n'existe pas, lancez une exception ou renvoyez un message d'erreur.
    if (!todo) {
      throw new Error("Le Todo n'a pas été trouvé.");
    }

    // Restaurez le Todo en supprimant la date de suppression (deletedAt).
    todo.deletedAt = null;

    // Enregistrez les modifications dans la base de données.
    return this.todoRepository.save(todo);
  }

  async getTodoCountByStatus(): Promise<{ status: string; count: number }[]> {
    // Utilisez une requête SQL pour compter les Todos pour chaque statut.
    const query = `
      SELECT status, COUNT(*) as count
      FROM todos
      GROUP BY status
    `;
    return this.todoRepository.query(query);
  }
  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  async getTodoById(id: number): Promise<TodoEntity | null> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      // Vous pouvez lancer une exception ou renvoyer `null` selon votre choix.
      throw new Error("Le Todo n'a pas été trouvé.");
    }
    return todo;
  }

  async searchTodos(
    name?: string,
    description?: string,
    status?: string,
  ): Promise<TodoEntity[]> {
    const query = this.todoRepository.createQueryBuilder('todo');

    if (name) {
      query.andWhere('todo.name LIKE :name', { name: `%${name}%` });
    }

    if (description) {
      query.andWhere('todo.description LIKE :description', {
        description: `%${description}%`,
      });
    }

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    return query.getMany();
  }

  async getAll(page: number, perPage: number): Promise<TodoEntity[]> {
    const skip = (page - 1) * perPage;
    return this.todoRepository.find({
      skip,
      take: perPage,
    });
  }
}
