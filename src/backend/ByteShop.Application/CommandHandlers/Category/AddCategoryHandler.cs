﻿using ByteShop.Application.Commands.Category;
using ByteShop.Domain.Interfaces.Repositories;
using FluentValidation.Results;
using MediatR;

namespace ByteShop.Application.CommandHandlers.Category;
public class AddCategoryHandler : IRequestHandler<AddCategoryCommand, ValidationResult>
{
    private readonly ICategoryRepository _categoryRepo;
    private readonly IUnitOfWork _uow;

    public AddCategoryHandler(
        ICategoryRepository categoryRepo,
        IUnitOfWork uow)
    {
        _categoryRepo = categoryRepo;
        _uow = uow;
    }

    public async Task<ValidationResult> Handle(AddCategoryCommand command, CancellationToken cancellationToken)
    {
        Domain.Entities.Category parentCategory = null;

        if (command.ParentCategoryId != 0)
            parentCategory = await _categoryRepo
                .GetByIdWithAssociationAsync(command.ParentCategoryId);


        Domain.Entities.Category newCategory;
        if (parentCategory != null)
        {
            newCategory = new Domain.Entities.Category(command.Name, parentCategory);
        }
        else
        {
            newCategory = new Domain.Entities.Category(command.Name);
        }

        if (newCategory.IsValid())
        {
            await _categoryRepo.AddAsync(newCategory);
            await _uow.CommitAsync();
        }

        return newCategory.ValidationResult;
    }

}
