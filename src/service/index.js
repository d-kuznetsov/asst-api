class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async createClient(params) {
    await this.repository.createClient(params);
  }

  async readClient(id) {
    return await this.repository.readClient(id);
  }

  async updateClient(params) {
    await this.repository.updateClient(params);
  }

  async deleteClient(id) {
    await this.repository.deleteClient(id);
  }
}

module.exports = {
  Service,
};
